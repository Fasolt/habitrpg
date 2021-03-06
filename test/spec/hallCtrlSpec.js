'use strict';

describe('Hall of Heroes Controller', function() {
  var scope, ctrl, user, $rootScope;

  beforeEach(function() {
    module(function($provide) {
      $provide.value('User', {});
    });

    inject(function($rootScope, $controller){
      user = specHelper.newUser();
      user._id = "unique-user-id"

      scope = $rootScope.$new();

      // Load RootCtrl to ensure shared behaviors are loaded
      $controller('RootCtrl',  {$scope: scope, User: {user: user}});

      ctrl = $controller('HallHeroesCtrl', {$scope: scope, User: {user: user}});
    });
  });

  it('populates contributor input with selected hero id', function(){
    var loadHero = sinon.spy(scope, "loadHero");
    var scrollTo = sinon.spy(window, "scrollTo");

    scope.populateContributorInput(user._id);
    expect(scope._heroID).to.eql(user._id);
    expect(loadHero.callCount).to.eql(1);
    expect(scrollTo.callCount).to.eql(1);

    scope.loadHero.restore();
    window.scrollTo.restore();
  });
});
