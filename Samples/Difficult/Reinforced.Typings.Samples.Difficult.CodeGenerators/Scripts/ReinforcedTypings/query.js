var QueryController = (function () {
    function QueryController() {
    }
    QueryController.query = function (url, data, progressSelector, disableSelector) {
        if (disableSelector === void 0) { disableSelector = ''; }
        var promise = jQuery.Deferred();
        var query = {
            data: JSON.stringify(data),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            timeout: 9000000,
            traditional: false,
            complete: function () {
                if (progressSelector && progressSelector.length > 0) {
                    $(progressSelector).find('i[data-role="progressContainer"]').remove();
                }
                if (disableSelector && disableSelector.length > 0) {
                    $(disableSelector).prop('disabled', false);
                }
            },
            success: function (response) {
                promise.resolve(response);
            },
            error: function (request, status, error) {
                promise.reject({ Success: false, Message: error.toString(), Data: error });
            }
        };
        if (progressSelector && progressSelector.length > 0) {
            $(progressSelector).append('<i data-role="progressContainer"> <span class="glyphicon glyphicon-cd spin"></span> Loading ... </i>');
        }
        if (disableSelector && disableSelector.length > 0) {
            $(disableSelector).prop('disabled', true);
        }
        $.ajax(url, query);
        return promise;
    };
    return QueryController;
})();
//# sourceMappingURL=query.js.map