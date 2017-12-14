'use strict';

const AuthService = function ($http, $q, $auth, $state)  {
    /**
     * Helper auth functions
     */

    return {
        skipIfLoggedIn() {
            let deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        },
        loginRequired(){
            let deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $state.go('admin.authenticate');
            }
            return deferred.promise;
        }
    }
};

export default AuthService;