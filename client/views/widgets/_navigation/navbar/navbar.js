Template['navbar'].rendered = function () {
  $('.button-collapse').sideNav();
};


Tracker.autorun(function(c){
  var user = Meteor.user();
  if (user && user.firstLogin) {
    analytics.track('Sign Up',
      {userId: Meteor.userId()});
    Meteor.call("afterFirstLogin");
    c.stop();
  }
});

Template['navbar'].helpers({
  isActiveOwnProfile: function(){
    var user = Meteor.user(); if (!user) return ''
    var twittername = user.profile && user.profile.twitterName;
    if (!twittername) return ''
    return (location.pathname == '/@'+twittername) ? 'active': ''
  }
});

Template['navbar'].events({
  'click #nav-mobile a': function (e, t) {
    Meteor.setTimeout(function triggerClick(){
      $('#sidenav-overlay').trigger('click');
    }, 280)

  },
  'click #login-button': function(e, t){
    analytics.track('redirect to Sign In', {
      from: 'navbar'
    });
    FlowRouter.go('/sign-in')/* Meteor.loginWithTwitter({
      loginStyle: 'redirect'
    })*/
  }
});
