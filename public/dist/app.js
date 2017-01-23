"use strict";!function(){angular.module("track.menu",[])}(),function(){angular.module("track.lift",[])}(),function(){angular.module("track.nav",[])}(),function(){angular.module("track.services",[])}(),function(){function t(t,e,n,r){e.otherwise("/signin"),t.state("add",{url:"/",templateUrl:"app/add/add.html",controller:"addController",authenticate:!0}).state("signin",{url:"/signin",templateUrl:"app/signin/signin.html",controller:"signinController"}).state("signup",{url:"/signup",templateUrl:"app/signup/signup.html",controller:"signupController"}).state("lift",{url:"/:lift",templateUrl:"app/lift/lift.html",controller:"liftController",authenticate:!0}),e.otherwise("/"),n.html5Mode(!0),r.interceptors.push("AttachTokens")}function e(t){var e={request:function(e){var n=t.localStorage.getItem("JRT");return n&&(e.headers["x-access-token"]=n),e.headers["Allow-Control-Allow-Origin"]="*",e}};return e}function n(t,e,n){t.$on("$stateChangeStart",function(t,r,o,i,a){"lift"!==r.name&&"add"!==r.name||n.isAuth()||(t.preventDefault(),e.go("signin"))})}angular.module("track",["track.nav","track.add","track.lift","track.signin","track.signup","track.menu","track.services","ui.router"]).config(t).factory("AttachTokens",e).run(n),t.$inject=["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider"],n.$inject=["$rootScope","$state","Auth"],e.$inject=["$window"]}(),function(){function t(t,e,n){function r(){var n={lift:t.lift.toLowerCase(),weight:t.weight,reps:t.reps};e.submitLift(n)}t.lift="",t.weight="",t.reps="",t.sendLift=r}angular.module("track.add",[]).controller("addController",t),t.$inject=["$scope","userData","Auth"]}(),function(){function t(t,e,n){function r(t){e.path("/"+t)}function o(){n.getData().then(function(e){t.data.liftList=e}),document.getElementById("myDropdown").classList.toggle("show")}function i(t){if(!t.target.matches(".dropbtn"))for(var e=document.getElementsByClassName("dropdown-content"),n=0;n<e.length;n++){var r=e[n];r.classList.contains("show")&&r.classList.remove("show")}}t.data={},t.getLifts=o,window.onclick=i,t.goto=r}angular.module("track.menu").controller("dropDownMenu",t),t.$inject=["$scope","$location","userData"]}(),function(){function t(){return{restrict:"AE",replace:!0,scope:!0,controller:"dropDownMenu",templateUrl:"app/dropdown/dropdown.html"}}angular.module("track.menu").directive("liftDropdown",t)}(),function(){function t(){return{restrict:"E",template:"<div></div>",replace:!0,link:function(t,e,n){Morris.Line({element:e,data:t[n.data],xkey:t[n.xkey],ykeys:t[n.ykeys],labels:t[n.labels],lineColors:["#627C8D"],parseTime:!1,gridTextFamily:"Roboto",resize:!0})}}}angular.module("track.lift").directive("linechart",t)}(),function(){function t(t,e,n,r,o,i){function a(e,r){i.removeLiftData(e).then(function(o){t.myModel.length>1?(t.myModel=t.myModel.filter(function(t){return t._id!==e}),n.reload()):i.deleteLift(r,"remove")})}function l(e){"ORM"===e?t.choice="info":t.choice="ORM"}function u(e){return"ORM"===e?"ORM"===t.choice?{"font-weight":"bolder"}:{"font-weight":"normal"}:"info"===t.choice?{"font-weight":"bolder"}:{"font-weight":"normal"}}t.lift=e.lift,t.data={},t.data.lift=!1,t.deleteLift=i.deleteLift,t.remove=a,t.choice="ORM",t.swap=l,t.activeCSS=u,i.getLiftData(t.lift).then(function(e){t.xkey="date",t.ykeys=["OneRepMax"],t.labels=["One Rep Max"],t.myModel=e,t.data.liftData=e,t.data.lift=!0})}angular.module("track.lift").controller("liftController",t),t.$inject=["$scope","$stateParams","$state","$location","$http","userData"]}(),function(){function t(){return{restrict:"AE",replace:!0,scope:!0,controller:"liftController",templateUrl:"app/lift/liftinfo.html"}}angular.module("track.lift").directive("liftInfo",t)}(),function(){function t(t,e,n){t.isAuth=n.isAuth,t.logout=n.logout}angular.module("track.nav").controller("navController",t),t.$inject=["$scope","$location","Auth"]}(),function(){function t(){return{restrict:"AE",replace:!0,scope:!0,controller:"navController",templateUrl:"app/navigation/nav.html"}}angular.module("track.nav").directive("navBar",t)}(),function(){function t(t,e,n){function r(n){return t({method:"POST",url:"/api/signup",data:n}).then(function(t){return"user"===t.data?t.data:(localStorage.setItem("JRT",t.data.token),void e.path("/"))})}function o(n){return t({method:"POST",url:"/api/signin",data:n}).then(function(t){var n=t.data;return"user"===n||"password"===n?n:(localStorage.setItem("JRT",n.token),void e.path("/"))})}function i(){return!!localStorage.getItem("JRT")}function a(){localStorage.removeItem("JRT"),e.path("/signin")}return{signup:r,signin:o,isAuth:i,logout:a}}angular.module("track.services").factory("Auth",t),t.$inject=["$http","$location","$window"]}(),function(){function t(t,e){function n(e){return t({method:"GET",url:"/api/user"}).then(function(t){return l(t.data)})}function r(e){return t({method:"GET",url:"/api/"+e}).then(function(t){return t.data})}function o(n){return n.lift=u(n.lift),t({method:"POST",url:"/api/submitLift",data:n}).then(function(t){return e.path("/"+n.lift)})}function i(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"delete",o=!1;o="delete"!==r||confirm("Are you sure?"),o&&t({method:"DELETE",url:"/api/delete/"+n}).then(function(){return e.path("/")})}function a(e){var n=confirm("Are you sure?");if(n)return t({method:"DELETE",url:"/api/remove/"+e}).then(function(t){return t})}function l(t){return t.reduce(function(t,e){return t.indexOf(e.lift)===-1&&t.push(e.lift),t},[])}function u(t){var e=t.toLowerCase(),n=e[0].toUpperCase();return n+e.substr(1)}return{getData:n,getLiftData:r,submitLift:o,deleteLift:i,removeLiftData:a}}angular.module("track.services").factory("userData",t),t.$inject=["$http","$location"]}(),function(){function t(t,e){function n(){e.signin(t.user).then(function(t){return r(t)})}function r(e){return"password"===e?t.errorMsg="Incorrect Password.":t.errorMsg="Username does not exist."}t.user={},t.errorMsg="",t.signin=n}angular.module("track.signin",[]).controller("signinController",t),t.$inject=["$scope","Auth"]}(),function(){function t(t,e){function n(){t.user.password.length>=8?e.signup(t.user).then(function(e){"user"===e&&(t.error="Username unavailable.",t.err=!0)}):(t.error="Password must be 8 characters long.",t.err=!0)}t.user={},t.err="",t.error=!1,t.signup=n}angular.module("track.signup",[]).controller("signupController",t),t.$inject=["$scope","Auth"]}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRyb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS5qcyIsIm5hdmlnYXRpb24vbmF2Lm1vZHVsZS5qcyIsImFkZC9hZGQuanMiLCJkcm9wZG93bi9kcm9wZG93bi5jdHJsLmpzIiwiZHJvcGRvd24vZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwibGlmdC9ncmFwaC5kaXJlY3RpdmUuanMiLCJsaWZ0L2xpZnQuY3RybC5qcyIsImxpZnQvbGlmdGluZm8uZGlyZWN0aXZlLmpzIiwibmF2aWdhdGlvbi9uYXYuY3RybC5qcyIsIm5hdmlnYXRpb24vbmF2LmRpcmVjdGl2ZS5qcyIsInNlcnZpY2VzL2F1dGguc2VydmljZXMuanMiLCJzZXJ2aWNlcy91c2VyLnNlcnZpY2VzLmpzIiwic2lnbmluL3NpZ25pbi5qcyIsInNpZ251cC9zaWdudXAuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRsb2NhdGlvblByb3ZpZGVyIiwiJGh0dHBQcm92aWRlciIsIm90aGVyd2lzZSIsImludGVyY2VwdG9ycyIsInVybCIsIkF0dGFjaFRva2VucyIsInRlbXBsYXRlVXJsIiwicmVxdWVzdCIsImp3dCIsImhlYWRlcnMiLCJvYmplY3QiLCJhdXRoZW50aWNhdGUiLCJhdHRhY2giLCIkcm9vdFNjb3BlIiwibmFtZSIsInB1c2giLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYWRkQ29udHJvbGxlciIsInVzZXJEYXRhIiwiJHNjb3BlIiwibGlmdCIsInRvU3RhdGUiLCJ0b1BhcmFtcyIsImZyb21TdGF0ZSIsImZyb21QYXJhbXMiLCJ3ZWlnaHQiLCJyZXBzIiwiaXNBdXRoIiwic2VuZExpZnQiLCJjb25maWciLCIkaW5qZWN0IiwiYXV0aFJvdXRlcyIsImZhY3RvcnkiLCJydW4iLCJkcm9wRG93bk1lbnUiLCJBdXRoIiwid2luZG93Iiwib25jbGljayIsInBhdGgiLCIkbG9jYXRpb24iLCJkYXRhIiwiZ2V0TGlmdHMiLCJnZXRMaWZ0c0Z1bmN0aW9uIiwib3BlbkRyb3Bkb3duIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJsaWZ0TGlzdCIsImRpcmVjdGl2ZSIsImRvY3VtZW50IiwibGlmdERyb3Bkb3duIiwidG9nZ2xlIiwicmVzdHJpY3QiLCJyZXBsYWNlIiwidGFyZ2V0IiwibWF0Y2hlcyIsInNjb3BlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImkiLCJkcm9wZG93bnMiLCJsZW5ndGgiLCJjbGlja2VyIiwibGluayIsImVsZW1lbnQiLCJ4a2V5IiwibGlmdENvbnRyb2xsZXIiLCIkc3RhdGVQYXJhbXMiLCJhdHRycyIsInlrZXlzIiwibGFiZWxzIiwiZGVsZXRlTGlmdCIsInJlbW92ZSIsInN3YXAiLCIkc3RhdGUiLCJyZWxvYWQiLCJfaWQiLCJpZCIsImNob2ljZSIsImZvbnQtd2VpZ2h0IiwiYWN0aXZlQ1NTIiwibXlNb2RlbCIsImxpZnREYXRhIiwibmF2QmFyIiwibG9nb3V0Iiwic2lnbnVwIiwiJGh0dHAiLCJtZXRob2QiLCJ1c2VyIiwiJHdpbmRvdyIsImxvY2FsU3RvcmFnZSIsInJlcyIsInNldEl0ZW0iLCJ0b2tlbiIsImdldERhdGEiLCJyZW1vdmVMaWZ0RGF0YSIsInJlbW92ZUl0ZW0iLCJzaWduaW4iLCJjYWxsYmFjayIsInR5cGUiLCJsaWZ0TmFtZSIsInRoZW4iLCJzdG9yYWdlIiwiY29uZmlybSIsImFyZ3VtZW50cyIsImFjYyIsImNhcGl0YWxpemVGaXJzdCIsImxvd2VyQ2FzZSIsIm1ha2VVbmlxdWUiLCJhcnJheSIsInJlZHVjZSIsImVsZSIsInNpZ25pbkNvbnRyb2xsZXIiLCJzdHJpbmciLCJ0b0xvd2VyQ2FzZSIsInN1Ym1pdExpZnQiLCJnZXRMaWZ0RGF0YSIsInNpZ251cENvbnRyb2xsZXIiLCJlcnJvciIsImNoZWNrRXJyb3IiXSwibWFwcGluZ3MiOiJBQUFBLHlCQ0NBQSxRQUFBQyxPQUFBLDZFQ0VBRCxRQUNBQyxPQUFBLHND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QSxRQUFBZ0YsR0FBQTNGLEVBQUFnQixHQU1BZ0YsUUFBQUEsdUNBRUEsTUFBQUEsR0FBQUEsS0FHQWhHLFFBQUFpRyxHQUFBQSxHQUNBakcsTUFBQWdFLGFBQUFBLEVBQUFBLEVBQUFBLFNBQUFBLHNCQUFBQSxFQUFBQSxTQUFBQSxxQ0FWQXpGLEVBQ0FDLFNBQUEsc0JEZUFBLE9BQUEwSCxtQkFBQXpILFdBQUEsbUJBQUFrSCxLQUNBTSxnRENNQWpHLEdBQUFBLEVBQUFnQiw4TkExQkFnRCxPQUFBQSxpQkFxQkFoRSxtQkFBQXZCLFdBQUEsbUJBQUF1SCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgndHJhY2snLCBbXG4gICAgJ3RyYWNrLm5hdicsXG4gICAgJ3RyYWNrLmFkZCcsXG4gICAgJ3RyYWNrLmxpZnQnLFxuICAgICd0cmFjay5zaWduaW4nLFxuICAgICd0cmFjay5zaWdudXAnLFxuICAgICd0cmFjay5tZW51JyxcbiAgICAndHJhY2suc2VydmljZXMnLFxuICAgICd1aS5yb3V0ZXInXSlcbiAgICAuY29uZmlnKGNvbmZpZylcbiAgICAuZmFjdG9yeSgnQXR0YWNoVG9rZW5zJywgQXR0YWNoVG9rZW5zKVxuICAgIC5ydW4oYXV0aFJvdXRlcyk7XG5cbiAgY29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsICckaHR0cFByb3ZpZGVyJ107XG4gIGF1dGhSb3V0ZXMuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc3RhdGUnLCAnQXV0aCddO1xuICBBdHRhY2hUb2tlbnMuJGluamVjdCA9IFsnJHdpbmRvdyddO1xuXG4gIGZ1bmN0aW9uIGNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICRodHRwUHJvdmlkZXIpIHtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvc2lnbmluJyk7XG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2FkZCcsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvYWRkL2FkZC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdhZGRDb250cm9sbGVyJyxcbiAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZVxuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduaW4nLCB7XG4gICAgICB1cmw6ICcvc2lnbmluJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3NpZ25pbi9zaWduaW4uaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnc2lnbmluQ29udHJvbGxlcicsXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ251cCcsIHtcbiAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc2lnbnVwL3NpZ251cC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdzaWdudXBDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdsaWZ0Jywge1xuICAgICAgdXJsOiAnLzpsaWZ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2xpZnQvbGlmdC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdsaWZ0Q29udHJvbGxlcicsXG4gICAgICBhdXRoZW50aWNhdGU6IHRydWVcbiAgICB9KTtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpOyAvL1JlbW92ZSB0aGUgJyMnIGZyb20gVVJMLlxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ0F0dGFjaFRva2VucycpO1xuICB9XG5cbiAgZnVuY3Rpb24gQXR0YWNoVG9rZW5zICgkd2luZG93KSB7XG4gICAgY29uc3QgYXR0YWNoID0ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICBjb25zdCBqd3QgPSAkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdKUlQnKTtcbiAgICAgICAgaWYgKGp3dCkge1xuICAgICAgICAgIG9iamVjdC5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddID0gand0O1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdC5oZWFkZXJzWydBbGxvdy1Db250cm9sLUFsbG93LU9yaWdpbiddID0gJyonO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGF0dGFjaDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF1dGhSb3V0ZXMgKCRyb290U2NvcGUsICRzdGF0ZSwgQXV0aCkge1xuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuICAgICAgaWYgKHRvU3RhdGUubmFtZSA9PT0gJ2xpZnQnIHx8IHRvU3RhdGUubmFtZSA9PT0gJ2FkZCcpIHtcbiAgICAgICAgaWYgKCFBdXRoLmlzQXV0aCgpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkc3RhdGUuZ28oJ3NpZ25pbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgndHJhY2subWVudScsIFtdKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIFxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgndHJhY2submF2JywgW10pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCd0cmFjay5hZGQnLCBbXSlcbiAgICAuY29udHJvbGxlcignYWRkQ29udHJvbGxlcicsIGFkZENvbnRyb2xsZXIpO1xuICAgICAgXG4gIGFkZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ3VzZXJEYXRhJywgJ0F1dGgnXTtcblxuICBmdW5jdGlvbiBhZGRDb250cm9sbGVyICgkc2NvcGUsIHVzZXJEYXRhLCBBdXRoKSB7XG4gICAgJHNjb3BlLmxpZnQgPSAnJztcbiAgICAkc2NvcGUud2VpZ2h0ID0gJyc7XG4gICAgJHNjb3BlLnJlcHMgPSAnJztcbiAgICAkc2NvcGUuc2VuZExpZnQgPSBzZW5kTGlmdDtcbiAgICBcbiAgICBmdW5jdGlvbiBzZW5kTGlmdCAoKSB7XG4gICAgICBjb25zdCBzdG9yYWdlID0ge1xuICAgICAgICBsaWZ0OiAkc2NvcGUubGlmdC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB3ZWlnaHQ6ICRzY29wZS53ZWlnaHQsXG4gICAgICAgIHJlcHM6ICRzY29wZS5yZXBzXG4gICAgICB9O1xuICAgICAgdXNlckRhdGEuc3VibWl0TGlmdChzdG9yYWdlKTtcbiAgICB9XG4gIH1cbiB9KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCd0cmFjay5tZW51JylcbiAgICAuY29udHJvbGxlcignZHJvcERvd25NZW51JywgZHJvcERvd25NZW51KTtcbiAgICBcbiAgZHJvcERvd25NZW51LiRpbmplY3QgPSBbJyRzY29wZScsICckbG9jYXRpb24nLCAndXNlckRhdGEnXTtcblxuICBmdW5jdGlvbiBkcm9wRG93bk1lbnUgKCRzY29wZSwgJGxvY2F0aW9uLCB1c2VyRGF0YSkge1xuICAgICRzY29wZS5kYXRhID0ge307XG4gICAgJHNjb3BlLmdldExpZnRzID0gZ2V0TGlmdHNGdW5jdGlvbjtcbiAgICB3aW5kb3cub25jbGljayA9IGNsaWNrZXI7XG4gICAgJHNjb3BlLmdvdG8gPSBnb3RvO1xuICAgIFxuICAgIGZ1bmN0aW9uIGdvdG8gKHBhdGgpIHtcbiAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyArIHBhdGgpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBnZXRMaWZ0c0Z1bmN0aW9uICgpIHtcbiAgICAgIHVzZXJEYXRhLmdldERhdGEoKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICRzY29wZS5kYXRhLmxpZnRMaXN0ID0gZGF0YTtcbiAgICAgICAgfSlcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteURyb3Bkb3duJykuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsaWNrZXIgKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKCcuZHJvcGJ0bicpKSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3ducyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkcm9wZG93bi1jb250ZW50XCIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICAgICAgaWYgKG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICAgICAgb3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gXG4gICAgfVxuICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCd0cmFjay5tZW51JylcbiAgICAuZGlyZWN0aXZlKCdsaWZ0RHJvcGRvd24nLCBsaWZ0RHJvcGRvd24pO1xuXG4gIGZ1bmN0aW9uIGxpZnREcm9wZG93biAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29udHJvbGxlcjogJ2Ryb3BEb3duTWVudScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9kcm9wZG93bi9kcm9wZG93bi5odG1sJ1xuICAgIH07XG4gIH1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCd0cmFjay5saWZ0JylcbiAgICAuZGlyZWN0aXZlKCdsaW5lY2hhcnQnLCBsaW5lY2hhcnQpO1xuICBcbiAgZnVuY3Rpb24gbGluZWNoYXJ0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiAnPGRpdj48L2Rpdj4nLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgTW9ycmlzLkxpbmUoe1xuICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgZGF0YTogJHNjb3BlW2F0dHJzLmRhdGFdLFxuICAgICAgICAgIHhrZXk6ICRzY29wZVthdHRycy54a2V5XSxcbiAgICAgICAgICB5a2V5czogJHNjb3BlW2F0dHJzLnlrZXlzXSxcbiAgICAgICAgICBsYWJlbHM6ICRzY29wZVthdHRycy5sYWJlbHNdLFxuICAgICAgICAgIGxpbmVDb2xvcnM6IFsnIzYyN0M4RCddLFxuICAgICAgICAgIHBhcnNlVGltZTogZmFsc2UsXG4gICAgICAgICAgZ3JpZFRleHRGYW1pbHk6ICdSb2JvdG8nLFxuICAgICAgICAgIHJlc2l6ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCd0cmFjay5saWZ0JylcbiAgICAuY29udHJvbGxlcignbGlmdENvbnRyb2xsZXInLCBsaWZ0Q29udHJvbGxlcilcblxuICBsaWZ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJyRzdGF0ZScsICckbG9jYXRpb24nLCAnJGh0dHAnLCAndXNlckRhdGEnXTtcblxuICBmdW5jdGlvbiBsaWZ0Q29udHJvbGxlciAoJHNjb3BlLCAkc3RhdGVQYXJhbXMsICRzdGF0ZSwgJGxvY2F0aW9uLCAkaHR0cCwgdXNlckRhdGEpIHtcbiAgICAkc2NvcGUubGlmdCA9ICRzdGF0ZVBhcmFtcy5saWZ0O1xuICAgICRzY29wZS5kYXRhID0ge307XG4gICAgJHNjb3BlLmRhdGEubGlmdCA9IGZhbHNlO1xuICAgICRzY29wZS5kZWxldGVMaWZ0ID0gdXNlckRhdGEuZGVsZXRlTGlmdDtcbiAgICAkc2NvcGUucmVtb3ZlID0gcmVtb3ZlO1xuICAgICRzY29wZS5jaG9pY2UgPSAnT1JNJztcbiAgICAkc2NvcGUuc3dhcCA9IHN3YXA7XG4gICAgJHNjb3BlLmFjdGl2ZUNTUyA9IGFjdGl2ZUNTUztcblxuICAgIHVzZXJEYXRhLmdldExpZnREYXRhKCRzY29wZS5saWZ0KVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICRzY29wZS54a2V5ID0gJ2RhdGUnO1xuICAgICAgICAkc2NvcGUueWtleXMgPSBbJ09uZVJlcE1heCddO1xuICAgICAgICAkc2NvcGUubGFiZWxzID0gWydPbmUgUmVwIE1heCddO1xuICAgICAgICAkc2NvcGUubXlNb2RlbCA9IGRhdGE7XG4gICAgICAgICRzY29wZS5kYXRhLmxpZnREYXRhID0gZGF0YTtcbiAgICAgICAgJHNjb3BlLmRhdGEubGlmdCA9IHRydWU7XG4gICAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlIChpZCwgbmFtZSkge1xuICAgICAgdXNlckRhdGEucmVtb3ZlTGlmdERhdGEoaWQpXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKCRzY29wZS5teU1vZGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICRzY29wZS5teU1vZGVsID0gJHNjb3BlLm15TW9kZWwuZmlsdGVyKGxpZnQgPT4gbGlmdC5faWQgIT09IGlkKTtcbiAgICAgICAgICAgICRzdGF0ZS5yZWxvYWQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlckRhdGEuZGVsZXRlTGlmdChuYW1lLCAncmVtb3ZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2FwIChjaG9pY2UpIHtcbiAgICAgIGNob2ljZSA9PT0gJ09STScgPyAkc2NvcGUuY2hvaWNlID0gJ2luZm8nIDogJHNjb3BlLmNob2ljZSA9ICdPUk0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFjdGl2ZUNTUyAoY2hvaWNlKSB7XG4gICAgICBpZiAoY2hvaWNlID09PSAnT1JNJykge1xuICAgICAgICByZXR1cm4gJHNjb3BlLmNob2ljZSA9PT0gJ09STScgPyB7J2ZvbnQtd2VpZ2h0JzogJ2JvbGRlcid9IDogeydmb250LXdlaWdodCc6ICdub3JtYWwnfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkc2NvcGUuY2hvaWNlID09PSAnaW5mbycgPyB7J2ZvbnQtd2VpZ2h0JzogJ2JvbGRlcid9IDogeydmb250LXdlaWdodCc6ICdub3JtYWwnfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ3RyYWNrLmxpZnQnKVxuICAgIC5kaXJlY3RpdmUoJ2xpZnRJbmZvJywgbGlmdEluZm8pO1xuXG4gIGZ1bmN0aW9uIGxpZnRJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6ICdsaWZ0Q29udHJvbGxlcicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9saWZ0L2xpZnRpbmZvLmh0bWwnXG4gICAgfTtcbiAgfVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCd0cmFjay5uYXYnKVxuICAgIC5jb250cm9sbGVyKCduYXZDb250cm9sbGVyJywgbmF2Q29udHJvbGxlcik7XG5cbiAgbmF2Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvY2F0aW9uJywgJ0F1dGgnXTtcblxuICBmdW5jdGlvbiBuYXZDb250cm9sbGVyICgkc2NvcGUsICRsb2NhdGlvbiwgQXV0aCkge1xuICAgICRzY29wZS5pc0F1dGggPSBBdXRoLmlzQXV0aDtcbiAgICAkc2NvcGUubG9nb3V0ID0gQXV0aC5sb2dvdXQ7XG4gIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIFxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgndHJhY2submF2JylcbiAgICAuZGlyZWN0aXZlKCduYXZCYXInLCBuYXZCYXIpO1xuXG4gIGZ1bmN0aW9uIG5hdkJhciAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29udHJvbGxlcjogJ25hdkNvbnRyb2xsZXInLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbmF2aWdhdGlvbi9uYXYuaHRtbCdcbiAgICB9O1xuICB9XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ3RyYWNrLnNlcnZpY2VzJylcbiAgICAuZmFjdG9yeSgnQXV0aCcsIEF1dGgpO1xuXG4gIEF1dGguJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvY2F0aW9uJywgJyR3aW5kb3cnXTtcblxuICBmdW5jdGlvbiBBdXRoICgkaHR0cCwgJGxvY2F0aW9uLCAkd2luZG93KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNpZ251cDogc2lnbnVwLFxuICAgICAgc2lnbmluOiBzaWduaW4sXG4gICAgICBpc0F1dGg6IGlzQXV0aCxcbiAgICAgIGxvZ291dDogbG9nb3V0XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNpZ251cCAodXNlcikge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9hcGkvc2lnbnVwJyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEgPT09ICd1c2VyJykge1xuICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSlJUJywgcmVzLmRhdGEudG9rZW4pO1xuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNpZ25pbiAodXNlcikge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9hcGkvc2lnbmluJyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICBpZiAoZGF0YSA9PT0gJ3VzZXInIHx8IGRhdGEgPT09ICdwYXNzd29yZCcpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSlJUJywgZGF0YS50b2tlbik7XG4gICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBdXRoICgpIHtcbiAgICAgIHJldHVybiAhIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdKUlQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvdXQgKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ0pSVCcpO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zaWduaW4nKTtcbiAgICB9XG4gIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ3RyYWNrLnNlcnZpY2VzJylcbiAgICAuZmFjdG9yeSgndXNlckRhdGEnLCB1c2VyRGF0YSk7XG5cbiAgdXNlckRhdGEuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvY2F0aW9uJ107XG5cbiAgZnVuY3Rpb24gdXNlckRhdGEgKCRodHRwLCAkbG9jYXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0RGF0YTogZ2V0RGF0YSxcbiAgICAgIGdldExpZnREYXRhOiBnZXRMaWZ0RGF0YSxcbiAgICAgIHN1Ym1pdExpZnQ6IHN1Ym1pdExpZnQsXG4gICAgICBkZWxldGVMaWZ0OiBkZWxldGVMaWZ0LFxuICAgICAgcmVtb3ZlTGlmdERhdGE6IHJlbW92ZUxpZnREYXRhXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldERhdGEgKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvYXBpL3VzZXInLFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiBtYWtlVW5pcXVlKHJlcy5kYXRhKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TGlmdERhdGEgKGxpZnROYW1lKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvYXBpLycgKyBsaWZ0TmFtZSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Ym1pdExpZnQgKHN0b3JhZ2UpIHtcbiAgICAgIHN0b3JhZ2UubGlmdCA9IGNhcGl0YWxpemVGaXJzdChzdG9yYWdlLmxpZnQpO1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9hcGkvc3VibWl0TGlmdCcsXG4gICAgICAgIGRhdGE6IHN0b3JhZ2VcbiAgICAgIH0pXG4gICAgICAudGhlbihkYXRhID0+ICRsb2NhdGlvbi5wYXRoKCcvJyArICBzdG9yYWdlLmxpZnQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVMaWZ0IChsaWZ0LCB0eXBlPSdkZWxldGUnKSB7XG4gICAgICBsZXQgY2hvaWNlID0gZmFsc2U7XG4gICAgICB0eXBlID09PSAnZGVsZXRlJyA/IGNob2ljZSA9IGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZT8nKSA6IGNob2ljZSA9IHRydWU7XG4gICAgICBpZiAoY2hvaWNlKSB7XG4gICAgICAgICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgIHVybDogJy9hcGkvZGVsZXRlLycgKyBsaWZ0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+ICRsb2NhdGlvbi5wYXRoKCcvJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpZnREYXRhIChpZCkge1xuICAgICAgdmFyIGNob2ljZSA9IGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZT8nKTtcbiAgICAgIGlmIChjaG9pY2UpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgIHVybDogJy9hcGkvcmVtb3ZlLycgKyBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbiAocmVzID0+IHJlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogSGVscGVyIEZ1bmN0aW9ucyAqL1xuICAgIFxuICAgIGZ1bmN0aW9uIG1ha2VVbmlxdWUgKGFycmF5KSB7XG4gICAgICByZXR1cm4gYXJyYXkucmVkdWNlKChhY2MsIGVsZSkgPT4ge1xuICAgICAgICBpZiAoYWNjLmluZGV4T2YoZWxlLmxpZnQpID09PSAtMSkge1xuICAgICAgICAgIGFjYy5wdXNoKGVsZS5saWZ0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdCAoc3RyaW5nKSB7XG4gICAgICB2YXIgbG93ZXJDYXNlID0gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgdXBwZXJGaXJzdCA9IGxvd2VyQ2FzZVswXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgcmV0dXJuIHVwcGVyRmlyc3QgK2xvd2VyQ2FzZS5zdWJzdHIoMSk7XG4gICAgfVxuICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCd0cmFjay5zaWduaW4nLCBbXSlcbiAgICAuY29udHJvbGxlcignc2lnbmluQ29udHJvbGxlcicsIHNpZ25pbkNvbnRyb2xsZXIpO1xuICBcbiAgc2lnbmluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQXV0aCddO1xuICAgIFxuICBmdW5jdGlvbiBzaWduaW5Db250cm9sbGVyICgkc2NvcGUsIEF1dGgpIHtcbiAgICAkc2NvcGUudXNlciA9IHt9O1xuICAgICRzY29wZS5lcnJvck1zZyA9ICcnO1xuICAgICRzY29wZS5zaWduaW4gPSBzaWduaW47XG5cbiAgICBmdW5jdGlvbiBzaWduaW4gKCkge1xuICAgICAgQXV0aC5zaWduaW4oJHNjb3BlLnVzZXIpXG4gICAgICAgIC50aGVuKGRhdGEgPT4gY2hlY2tFcnJvcihkYXRhKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tFcnJvciAoZXJyb3Ipe1xuICAgICAgcmV0dXJuIGVycm9yID09PSAncGFzc3dvcmQnID8gJHNjb3BlLmVycm9yTXNnID0gJ0luY29ycmVjdCBQYXNzd29yZC4nIDogJHNjb3BlLmVycm9yTXNnID0gJ1VzZXJuYW1lIGRvZXMgbm90IGV4aXN0Lic7XG4gICAgfVxuICB9XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIFxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgndHJhY2suc2lnbnVwJywgW10pXG4gICAgLmNvbnRyb2xsZXIoJ3NpZ251cENvbnRyb2xsZXInLCBzaWdudXBDb250cm9sbGVyKTtcbiAgICBcbiAgc2lnbnVwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQXV0aCddO1xuXG4gIGZ1bmN0aW9uIHNpZ251cENvbnRyb2xsZXIgKCRzY29wZSwgQXV0aCkge1xuICAgICRzY29wZS51c2VyID0ge307XG4gICAgJHNjb3BlLmVyciA9ICcnO1xuICAgICRzY29wZS5lcnJvciA9IGZhbHNlO1xuICAgICRzY29wZS5zaWdudXAgPSBzaWdudXA7XG5cbiAgICBmdW5jdGlvbiBzaWdudXAgKCkge1xuICAgICAgaWYgKCRzY29wZS51c2VyLnBhc3N3b3JkLmxlbmd0aCA+PSA4KSB7XG4gICAgICAgIEF1dGguc2lnbnVwKCRzY29wZS51c2VyKVxuICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICd1c2VyJykge1xuICAgICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSAnVXNlcm5hbWUgdW5hdmFpbGFibGUuJztcbiAgICAgICAgICAgICAgJHNjb3BlLmVyciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUuZXJyb3IgPSAnUGFzc3dvcmQgbXVzdCBiZSA4IGNoYXJhY3RlcnMgbG9uZy4nO1xuICAgICAgICAkc2NvcGUuZXJyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufSkoKTsiXX0=