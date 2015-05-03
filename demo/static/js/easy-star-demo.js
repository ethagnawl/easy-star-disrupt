var entrance = {
    y: 0,
    x: 7
};

var exit = {
    y: 7,
    x: 6
};

var register = {
    y: 6,
    x: 7
};

var _aisle = {
    get x() {
        return _.random(2, 5);
    }
};

var drones = _.extend(_aisle, {
    y: 3
});

var smart_watches = _.extend(_aisle, {
    y: 5
});

var selfie_sticks = _.extend(_aisle, {
    y: 7
});

var aisles = [drones, smart_watches, selfie_sticks];

var store = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
];

var EasyStarDemo = function() {

    var DEMO_USER_COUNT = 10;

    var DEMO_USER_MAX_ACTION_COUNT = 5;

    var easystar = new EasyStar.js();

    easystar.setGrid(store);

    easystar.setAcceptableTiles([0]);

    var log_path = function(path) {
        if (path === null) {
            console.log("Path was not found.");
        } else {
            var p = path.map(function(sp) {
                return "x: " + sp.x + ", y: " + sp.y;
            });
            console.log("Path was found. The path is:", p.join('\n'));
        }
    };

    var navigate = function(begin, end) {

        var path;

        easystar.findPath.call(null, begin.x, begin.y, end.x, end.y, function() {
            log_path(arguments[0]);
            path = arguments[0];
        });

        easystar.calculate();

        return path;

    };

    function User() {

        this.story = _.chain(_.range(0, DEMO_USER_MAX_ACTION_COUNT)).reduce(function(memo) {

            var last_location = _.last(_.last(memo).path);

            memo.push({
                path: navigate(last_location, _.sample(aisles)),
                event: (_.random(1) % 2 === 0) ? null : 'add-to-cart',
                pause: _.random(10, 20)
            });

            return memo;

        }, [{
            path: navigate(entrance, _.sample(aisles)),
            pause: _.random(10, 20),
            event: null
        }]).value();

        var last_location = _.last(_.last(this.story).path);

        this.story.push({
            path: navigate(last_location, register),
            event: 'checkout',
            pause: _.random(10, 20)
        });

    }

    var DEMO_USERS = _.chain(_.range(0, DEMO_USER_COUNT)).map(function() {

        return new User;

    }).value();

}
