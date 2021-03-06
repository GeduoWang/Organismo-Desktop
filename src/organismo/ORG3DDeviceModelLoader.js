/**
 * Created by jongabilondo on 22/03/2017.
 */
const ORG3DDeviceModel = require('./ORG3DDeviceModel')

module.exports =
/**
 * Utilities class to load and show THREE models of different devices.
 */
class ORG3DDeviceModelLoader {

    /**
     * Asynchronous load of a 3D model object for the corresponding device.
     * When load is finished it will call to the organismo scene to add the model to the three.js scene.
     * @param scene the ORG.scene to add the 3D model to.
     */
    static loadDevice3DModel(device, scene) {
        return new Promise((resolve, reject) => {
            if (device.productName.startsWith('iPhone 5')) {
                this._load_iPhone_5(scene,device).then(
                    (result) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
            } else { //if ( device.productName.startsWith('iPhone 6')) {
                this._load_iPhone_6(scene,device).then(
                    (result) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
            }
        });
    }

// PRIVATE

    static _load_iPhone_5(scene, device) {
        return new Promise((resolve, reject) => {
            let mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('assets/3DModels/iPhone_5/');
            mtlLoader.load('iPhone_5.mtl',
                (materials) => {
                    materials.preload();

                    let objLoader = new THREE.OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.setPath( 'assets/3DModels/iPhone_5/' );
                    objLoader.load( "iPhone_5.obj",
                        (object) => {
                            // model loaded, scale and translate
                            let deviceBox =  new THREE.Box3().setFromObject(object);
                            var deviceBoxVector;
                            deviceBoxVector = deviceBox.getSize(deviceBoxVector);
                            const scale = device.bodySize.height / deviceBoxVector.y;
                            object.scale.set( scale, scale, scale );
                            deviceBox =  new THREE.Box3().setFromObject(object);
                            deviceBoxVector = deviceBox.getSize(deviceBoxVector);
                            object.position.set( 0, - deviceBoxVector.y/2.0, - ((deviceBoxVector.z/2.0) + 0.0005) ); // Place device 0.5mm behind the screen
                            let deviceModel = new ORG3DDeviceModel(scene.THREEScene, object)
                            resolve(deviceModel);
                        },
                        null, //on progress
                        (error) => {
                            reject(error);
                        }
                    );
                },
                null, // on progress
                (error) => {
                    reject(error);
                });
        });
    }

    static _load_iPhone_6(scene, device) {
        return new Promise((resolve, reject) => {
            let mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('assets/3DModels/iPhone_6/');
            mtlLoader.load('iPhone_6.mtl',
                (materials) => {
                    materials.preload();

                    let objLoader = new THREE.OBJLoader();
                    objLoader.setPath('assets/3DModels/iPhone_6/');
                    objLoader.setMaterials(materials);
                    objLoader.load("iPhone_6.obj",
                        (object) => {
                            // model loaded, scale and translate
                            let deviceBox =  new THREE.Box3().setFromObject(object);
                            let deviceBoxVector;
                            deviceBoxVector = deviceBox.getSize(deviceBoxVector);
                            const scale = device.bodySize.height / deviceBoxVector.y;
                            object.scale.set(scale, scale, scale);
                            deviceBox =  new THREE.Box3().setFromObject(object);
                            deviceBoxVector = deviceBox.getSize(deviceBoxVector);
                            object.position.set(0, - (deviceBoxVector.y/2.0), - ((deviceBoxVector.z/2.0) + 0.0005) ); // Place device 0.5mm behind the screen
                            let deviceModel = new ORG3DDeviceModel(scene.THREEScene, object)
                            resolve(deviceModel);
                        },
                        null, /*on progress*/
                        (error) => {
                            reject(error);
                        }
                    );
                },
                null, // on progress
                (error) => {
                    reject(error);
                })
        })
    }
}