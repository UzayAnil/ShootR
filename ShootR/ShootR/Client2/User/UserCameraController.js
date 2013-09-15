/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />
var ShootR;
(function (ShootR) {
    var UserCameraController = (function () {
        function UserCameraController(_myShipId, _shipManager, _camera) {
            var _this = this;
            this._myShipId = _myShipId;
            this._shipManager = _shipManager;
            this._camera = _camera;
            this._movementTween = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, UserCameraController.MOVEMENT_TIME, eg.Tweening.Functions.Exponential.EaseOut);
            this._movementTween.OnChange.Bind(function (newPosition) {
                _this._camera.Position = newPosition;
            });
            this._movementTween.OnComplete.Bind(function (_) {
                _this._movementTween.Play();
            });
            this._movementTween.Play();
        }
        UserCameraController.prototype.Update = function (gameTime) {
            var ship = this._shipManager.GetShip(this._myShipId), distance, positionIncrementor;

            if (ship) {
                distance = ship.MovementController.Position.Distance(this._camera.Position).Magnitude();

                positionIncrementor = ship.MovementController.Position.Subtract(this._camera.Position).Unit().Multiply(distance * (gameTime.Elapsed.Seconds / UserCameraController.MOVEMENT_TIME.Seconds));

                this._camera.Position = this._camera.Position.Add(positionIncrementor);
            }
        };
        UserCameraController.DISTANCE_THRESHOLD = 50;
        UserCameraController.MOVEMENT_TIME = eg.TimeSpan.FromSeconds(.15);
        return UserCameraController;
    })();
    ShootR.UserCameraController = UserCameraController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserCameraController.js.map
