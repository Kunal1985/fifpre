Meteor.startup(function () {
    console.log("SERVER");
});

Meteor.methods({
    "myPredictions": function(doc){
        var myPredictions = MyPredictions.findOne({team1: doc.team1, team2: doc.team2});
        if(myPredictions){
            MyPredictions.update({_id: myPredictions._id}, {$set: {team1: doc.team1, team2: doc.team2, goal1: doc.goal1, goal2: doc.goal2}});
        } else{
            MyPredictions.insert(doc);
        }
    },
    "actualPredictions": function(doc){
        var actualPredictions = ActualPredictions.findOne({team1: doc.team1, team2: doc.team2});
        if(ActualPredictions){
            ActualPredictions.update({_id: actualPredictions._id}, {$set: {team1: doc.team1, team2: doc.team2, goal1: doc.goal1, goal2: doc.goal2}});
        } else{
            ActualPredictions.insert(doc);
        }
	},
});