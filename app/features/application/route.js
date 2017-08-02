import Ember from 'ember';
const {get} = Ember;

export default Ember.Route.extend({
    beforeModel(){
        return get(this,'session').fetch().catch(function(){});
    },
    model(){
        return this.store.findAll('post');
    },
    setupController (controller, model) {
      this._super(...arguments)
      controller.setProperties({
        'email':'',
        'password':''
      })
    },
    actions:{
        login(){
            get(this,'session').open('firebase', { provider: 'twitter'}).then(function(data) {
                            console.log(data, get(this,'session'));
                  });
        },
        signIn(email, password) {
          let controller = this;
          this.get('session').open('firebase', { provider: 'password', email: email, password: password}).then(function(data) {
            console.log(data.currentUser);
          });
        },
        logout(){
            get(this,'session').close();
        }
    }
});
