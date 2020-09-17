"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddCreatedAtAndUpdatedAt1600264967376 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = require("typeorm/index");

var AddCreatedAtAndUpdatedAt1600264967376 = /*#__PURE__*/function () {
  function AddCreatedAtAndUpdatedAt1600264967376() {
    (0, _classCallCheck2["default"])(this, AddCreatedAtAndUpdatedAt1600264967376);
  }

  (0, _createClass2["default"])(AddCreatedAtAndUpdatedAt1600264967376, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.addColumns('users', [new _index.TableColumn({
                  name: 'createdAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                }), new _index.TableColumn({
                  name: 'updatedAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                })]);

              case 2:
                _context.next = 4;
                return queryRunner.addColumns('posts', [new _index.TableColumn({
                  name: 'createdAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                }), new _index.TableColumn({
                  name: 'updatedAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                })]);

              case 4:
                _context.next = 6;
                return queryRunner.addColumns('comments', [new _index.TableColumn({
                  name: 'createdAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                }), new _index.TableColumn({
                  name: 'updatedAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                })]);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function up(_x) {
        return _up.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryRunner) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return queryRunner.dropColumn('users', 'createdAt');

              case 2:
                _context2.next = 4;
                return queryRunner.dropColumn('users', 'updatedAt');

              case 4:
                _context2.next = 6;
                return queryRunner.dropColumn('posts', 'createdAt');

              case 6:
                _context2.next = 8;
                return queryRunner.dropColumn('posts', 'updatedAt');

              case 8:
                _context2.next = 10;
                return queryRunner.dropColumn('comments', 'createdAt');

              case 10:
                _context2.next = 12;
                return queryRunner.dropColumn('comments', 'updatedAt');

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function down(_x2) {
        return _down.apply(this, arguments);
      }

      return down;
    }()
  }]);
  return AddCreatedAtAndUpdatedAt1600264967376;
}();

exports.AddCreatedAtAndUpdatedAt1600264967376 = AddCreatedAtAndUpdatedAt1600264967376;