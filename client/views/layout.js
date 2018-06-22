Template.headerItems.helpers({
	isLoggedIn: function(){
		if(!Meteor.user()){
			return false;
		}
		return true;
	},
	isAdmin: function(){
		if(!Meteor.user()){
			return false;
		} else{
			var userRole = UserRole.findOne({user: Meteor.userId()});
			if(userRole == null)
				return false;
			if(userRole.name == "admin")
				return true;
		}
		return false;
	}
});