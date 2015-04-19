(function() {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', '$ionicActionSheet', '$ionicModal', '$state', 'authService'];


    function SettingsController($scope, $ionicActionSheet, $ionicModal, $state, authService) {
        var vm = this;
        vm.notifications = true;
        vm.sendLocation = false;
        vm.showTerms = showTerms;
        vm.closeTerms = closeTerms;
        vm.showFAQS = showFAQS;
        vm.closeFAQs = closeFAQs;
        vm.showLogOutMenu = showLogOutMenu;


        var termsModal;
        $ionicModal.fromTemplateUrl('app/settings/terms.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            termsModal = modal;
        });

        var faqsModal;
        $ionicModal.fromTemplateUrl('app/settings/faqs.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            faqsModal = modal;
        });

        function showTerms() {
            termsModal.show();
        };

        function showFAQS() {
            faqsModal.show();
        };

        function closeTerms() {
            termsModal.hide();
        }

        function closeFAQs() {
            faqsModal.hide();
        }

        // Triggered on a the logOut button click
        function showLogOutMenu() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                // buttons: [
                // { text: '<b>Share</b> This' },
                // { text: 'Move' }
                // ],
                destructiveText: '退出',
                titleText: '这么好的应用，确定退出吗?',
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    //Called when one of the non-destructive buttons is clicked,
                    //with the index of the button that was clicked and the button object.
                    //Return true to close the action sheet, or false to keep it opened.
                    return true;
                },
                destructiveButtonClicked: function() {
                    //Called when the destructive button is clicked.
                    //Return true to close the action sheet, or false to keep it opened.
                    authService.logOut();
                    $state.go('app.question.home');
                }
            });
        };
    }
})();
