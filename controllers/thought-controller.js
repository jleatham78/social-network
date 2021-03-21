const { Thought, User } = require('../models');


const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

        addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $push: { reactions: body } },
              { new: true }
            )
              .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch(err => res.json(err));
          },
    
          deleteReaction({ params, body }, res) {
              Thought.findOneAndUpdate(
                  { _id: params.thoughtId},
                  {$pull: { reactions: {reactionId: params.reactionId }}},
                  {new: true }
                  )
              .then(dbThoughtData => res.json(dbThoughtData))
              .catch(err => res.json(err));
          },


    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
        

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    

};

module.exports = thoughtController;