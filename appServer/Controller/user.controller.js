const userSchema = require("../Models/userSchema");
const bcrypt = require('bcrypt');
const { request } = require("express");
const jwt = require('jsonwebtoken');
const saltRounds = 10;

function register(req, res) {
    //console.log("Request : ", request.body)
    const salt = bcrypt.genSaltSync(saltRounds);
    if (!req.body.password) {
        res.status(401).send({
            message: "Invalid Password!"
        });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newuser = new userSchema({
        name: req.body.name.toLowerCase(),
        email: req.body.email,
        password: hashedPassword
    })
    //console.log("Request0 : ", newuser)
    return newuser;
}

exports.signup = async (req, res) => {
    const newUser = register(req, res)
    await newUser.save(newUser).then(
        () => {
            res.status(200).send({
                message: "User Registered successfully"
            })
        }
    ).catch(
        (error) => {
            res.status(500).send({
                message: error.message
            });
        }
    )
}

function isValidPassword(usergivenpassword, userdbpassword) {
    return bcrypt.compareSync(usergivenpassword, userdbpassword)
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    if (!password) {
        //console.log("empty password...")
        res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    // checking if password was valid and send response accordingly
    if (!isValidPassword(req.body.password, user.password)) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    //signing token with user id
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.API_SECRET, {
        expiresIn: 86400
    });

    //responding to client request with user profile success message and access token.
    res.send({
        user: {
            id: user._id,
            email: user.email,
            fullName: user.name,
        },
        status: 200,
        message: "Login successful",
        accessToken: token,
    });

}

exports.getFollowers = async (req, res) => {
    const { email } = req.body;
    const user = await userSchema.findOne(
        {
            email
        }
    )
    const followers = user.followers.map((value) => value.email)
    const following = user.following.map((value) => value.email)

    // console.log("Followers : ", followers, " Following :", following)
    const followingEmails = [];
    for (let i = 0; i < followers.length; i++) {
        const email = followers[i];
        if (following.includes(email)) {
            followingEmails.push(email);
        }
    }

    // console.log(followingEmails);
    const OBJECT = user.followers.map((value) => {
        if (followingEmails.find((val) => val === value.email)) {
            // console.log('Current user following me : ',value.email)
            return { email: value.email, name: value.name, following: true }
        } else {
            return { email: value.email, name: value.name, following: false }
        }
    })
    //console.log("Destructure : ",OBJECT)

    if (user.followers.length > 0) {
        res.send(JSON.stringify(OBJECT))
    }
    else {
        res.send(JSON.stringify(null))
    }
}

exports.getFollowing = async (req, res) => {
    const { email } = req.body;
    const user = await userSchema.findOne(
        {
            email
        }
    )
    if (user.following.length > 0) {
        console.log("Following :",user.following)
        res.json({ following: user.following, success: true })
    }
    else {
        res.send(JSON.stringify(null))
    }
}

exports.getNotification = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userSchema.find(
            {
                email
            }
        )
        // console.log("Notification check : ",user[0].notification)
        if (user[0].notification.length > 0) {
            const NotificationMessage = user[0].notification.map(
                (value) => {
                    const name = value.name
                    return {name : name.charAt(0).toUpperCase() + name.slice(1), message: value.message , status: value.seen}
                }
            )
            res.send(JSON.stringify(NotificationMessage))
        }else{
            res.send(JSON.stringify(null))
        }
    } catch (error) {
        return res.status(500).json({ message: "Invalid user" });
    }
}
exports.addFollowing = async (req, res) => {
    const email = req.body.email;
    const following = req.body.newFollowing
    //console.log("DATA Following ADDING : ", req.body.newFollowing)
    try {
        const user = await userSchema.findOneAndUpdate(
          { email: email },
          { $push: { following}},
          { new: true }
        );

        const updatefollower = await userSchema.findOneAndUpdate(
            { email: following.email },
            { $push: { followers : {name:user.name , email: user.email}}},
            { new: true }
        );
        await updatefollower.save();
        updatefollower = await userSchema.findOneAndUpdate(
            { email: following.email },
            { $push: { notification : {name:user.name , email: user.email, message:" is following you", seen:false}}},
            { new: true }
        );
        await user.save();
        await updatefollower.save();
        res.json(user);
      } catch (err) {
        res.json({ message: err });
      }
}
exports.unFollow = async (req, res) => {
    const email = req.body.email;
    const followingemail = req.body.followingemail
    // console.log(email," : following ", followingemail)
    try {
        const user = await userSchema.findOne(
          { email: email },
        );
        //console.log("Did i find user : ",user.email)
        user.following = user.following.filter((Email) => Email ===followingemail);
        //console.log("What happen to user : ",user)
        const updatefollower = await userSchema.findOne(
            { email: followingemail},
        );

        updatefollower.followers = updatefollower.followers.filter((Email) => Email=== email);
        
        await user.save();
        await updatefollower.save();

        res.json(user);
      } catch (err) {
        res.json({ message: err });
      }
}

exports.search = async (req, res) => {
    const { name, email, id } = req.body;
    try {
        const user = await userSchema.find(
            {
                name
            }
        )

        let filteruser = user.filter((value) => value.email !== email)
        let isFollow = filteruser.map((data) => {
            //console.log(data, " ---- ", data.followers.find((value) => value.email === email))
            return { '_id': data._id, 'name': data.name, 'email': data.email, 'isFollowing': data.followers.some((value) => value.email === email) }
        })

        // console.log("Test result : ", isFollow)
        res.send(JSON.stringify({ foundresult: isFollow }))
    } catch (error) {
        return res.status(500).json({ message: "Invalid user" });
    }
}

exports.updateNotificationStatus = async(req,res)=>{
    const email = req.body.email;
    try {
        
        const user = await userSchema.findOne(
          { email: email },
        );

        user.notification= user.notification.map((value)=>{
            //console.log("Notification array : ",value)
            return {name : value.name, message :value.message ,seen : true};
        })

        await user.save()
        res.json(user)
      } catch (err) {
        res.json({ message: err });
      }
}
