const { User, Thought} = require('../models');


module.exports = {
  // Get all users
  getAllUsers(req, res) {
   User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// Delete a user and their thoughts
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'Thoughts and User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //adds friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friends found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete friend from user
  removeFriend(req, res){
   User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { userId: req.params.userId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thoughts found' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};