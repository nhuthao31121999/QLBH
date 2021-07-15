"use strict";

var osApp = angular.module('osApplication', ['ngRoute', 'ngAnimate', 'ngMessages', 'kendo.directives', 'osApplication.directives', 'ngCookies', 'ngSanitize']);

osApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);

function loadingOS() {    kendo.ui.progress($(document.body), true);    $('.k-loading-mask').height($(document).height());}function stopLoadingOS() {    kendo.ui.progress($(document.body), false);}function loadingPopUpOS() {
    kendo.ui.progress($(".k-window"), true);
    $('.k-loading-mask').height($(".k-window").height());

}

function stopLoadingPopUpOS() {
    kendo.ui.progress($(document.body), false);
}