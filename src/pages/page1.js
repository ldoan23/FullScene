// AUTHOR: NGUYEN VAN A - ID: 20221111
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export function init(container) {
    const room = new THREE.Group();
   // Floor Textures
    const loader = new THREE.TextureLoader();
    const texturePath = 'public/textures/'; 
    const colorMap = loader.load(texturePath + 'Concrete044C_1K-JPG_Color.jpg');
    const aoMap = loader.load(texturePath + 'Concrete044C_1K-JPG_AmbientOcclusion.jpg');
    const normalMap = loader.load(texturePath + 'Concrete044C_1K-JPG_NormalGL.jpg');
    const roughnessMap = loader.load(texturePath + 'Concrete044C_1K-JPG_Roughness.jpg');
    const metalnessMap = loader.load(texturePath + 'Concrete044C_1K-JPG_Metalness.jpg');
    const displacementMap = loader.load(texturePath + 'Concrete044C_1K-JPG_Displacement.jpg');

    // Floor geometry with sufficient segments for displacement
    const floorGeometry = new THREE.PlaneGeometry(20, 20, 256, 256);
    floorGeometry.attributes.uv2 = floorGeometry.attributes.uv; // Required for aoMap

    // Floor material using textures - added side: THREE.DoubleSide
    const floorMaterial = new THREE.MeshStandardMaterial({
        map: colorMap,
        aoMap: aoMap,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        metalnessMap: metalnessMap,
        displacementMap: displacementMap,
        displacementScale: 0.2, // điều chỉnh độ lồi lõm
        side: THREE.DoubleSide  // Fix for transparency when viewed from below
    });

    // Floor mesh
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    room.add(floor);

    // Function to enable shadows for any mesh
    function enableShadows(mesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    }

    // Wall
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xadd8e6,
        roughness: 0.4
    });

    const walls = [];
    const wallHeight = 20;
    const wallThickness = 0.2;

    // Back wall
    walls[0] = new THREE.Mesh(
        new THREE.BoxGeometry(20, wallHeight, wallThickness),
        wallMaterial
    );
    walls[0].position.set(0, wallHeight/2, -10);

    // Left wall
    walls[2] = new THREE.Mesh(
        new THREE.BoxGeometry(wallThickness, wallHeight, 20),
        wallMaterial
    );
    walls[2].position.set(-10, wallHeight/2, 0);

    walls.forEach(wall => {
        wall.receiveShadow = true;
        room.add(wall);
    });

    // Blackboard 
    const blackboard = new THREE.Mesh(
        new THREE.BoxGeometry(12, 4.8, 0.24),  
        new THREE.MeshStandardMaterial({ 
            color: 0x111111,
            roughness: 0.9,
            metalness: 0.1
        })
    );
    blackboard.position.set(1.8, 6, -9.93);
    blackboard.castShadow = true;
    blackboard.receiveShadow = true;
    room.add(blackboard);

    // Student desk 
    function createDesk(x, z) {
        const deskTop = new THREE.Mesh(
            new THREE.BoxGeometry(4.8, 0.4, 2.4),
            new THREE.MeshStandardMaterial({ color: 0x8B4513 })
        );
        deskTop.position.set(x, 2.4, z + 2);
        enableShadows(deskTop);
        room.add(deskTop);

        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });
        const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2.4);
        const positions = [
            [-2, 1.2, -1], [2, 1.2, -1],
            [-2, 1.2, 1], [2, 1.2, 1]
        ];
        positions.forEach(([dx, dy, dz]) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x + dx, dy, z + dz + 2);
            enableShadows(leg);
            room.add(leg);
        });
    }

    // Student chair 
    function createChair(x, z) {
        const seat = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.4, 2),
            new THREE.MeshStandardMaterial({ color: 0x654321 })
        );
        seat.position.set(x, 1.7, z + 4);
        enableShadows(seat);
        room.add(seat);

        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });
        const legGeometry = new THREE.CylinderGeometry(0.12, 0.12, 1.6);
        const positions = [
            [-0.8, 0.6, 3], [0.8, 0.6, 3],
            [-0.8, 0.6, 1.2], [0.8, 0.6, 1.2]
        ];
        positions.forEach(([dx, dy, dz]) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x + dx, dy + 0.3, z + dz + 2);
            enableShadows(leg);
            room.add(leg);
        });

        const backrest = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1.6, 0.4),
            new THREE.MeshStandardMaterial({ color: 0x654321 })
        );
        backrest.position.set(x, 2.5, z + 5);
        enableShadows(backrest);
        room.add(backrest);
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = 1; j <= 2; j++) {
            createDesk(i * 6, j * 6 - 8);
            createChair(i * 6, j * 6 - 7.2);
        }
    }

    // Teacher desk 
    function createTeacherDesk(x, z) {
        const deskTop = new THREE.Mesh(
            new THREE.BoxGeometry(6, 0.4, 3.2),
            new THREE.MeshStandardMaterial({ color: 0x8B4513 })
        );
        deskTop.position.set(x + 2, 2.8, z + 3.2);
        enableShadows(deskTop);
        room.add(deskTop);

        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });
        const legGeometry = new THREE.CylinderGeometry(0.24, 0.24, 2.8);
        const positions = [
            [-2.4, 1.4, 0], [2.4, 1.4, 0],
            [-2.4, 1.4, 2.4], [2.4, 1.4, 2.4]
        ];
        positions.forEach(([dx, dy, dz]) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x + dx + 2, dy, z + dz + 2);
            enableShadows(leg);
            room.add(leg);
        });
    }

    // Teacher chair
    function createTeacherChair(x, z) {
        const chairGroup = new THREE.Group();

        const seat = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 0.4, 2.4),
            new THREE.MeshStandardMaterial({ color: 0x654321 })
        );
        seat.position.set(0, 1.6, 1.2);
        enableShadows(seat);
        chairGroup.add(seat);

        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });
        const legGeometry = new THREE.CylinderGeometry(0.16, 0.16, 1.4);
        const positions = [
            [-1, 0.7, 2.2], [1, 0.7, 2.2],
            [-1, 0.7, 4.2], [1, 0.7, 4.2]
        ];
        positions.forEach(([dx, dy, dz]) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(dx, dy, dz - 2);
            enableShadows(leg);
            chairGroup.add(leg);
        });

        const backrest = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 2, 0.4),
            new THREE.MeshStandardMaterial({ color: 0x654321 })
        );
        backrest.position.set(0, 2.6, 2.2);
        enableShadows(backrest);
        chairGroup.add(backrest);

        chairGroup.rotation.y = Math.PI;
        chairGroup.position.set(x + 2, 0, z);
        room.add(chairGroup);
    }

    createTeacherDesk(-8, -8);
    createTeacherChair(-8, -6.8);

    // Clock 
    let minuteHandGroup, hourHandGroup, secondHandGroup;

    function createClock(x, y, z, font) {
        const clockGroup = new THREE.Group();

        const face = new THREE.Mesh(
            new THREE.CircleGeometry(1.28, 32),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        enableShadows(face);
        clockGroup.add(face);

        const ring = new THREE.Mesh(
            new THREE.RingGeometry(1.28, 1.4, 32),
            new THREE.MeshStandardMaterial({ color: 0x000000 })
        );
        enableShadows(ring);
        clockGroup.add(ring);

        for (let i = 1; i <= 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 1;
            const xPos = Math.sin(angle) * radius;
            const yPos = Math.cos(angle) * radius;

            const textGeo = new TextGeometry(i.toString(), {
                font: font,
                size: 0.12,
                height: 0.02,
            });

            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
            const textMesh = new THREE.Mesh(textGeo, textMaterial);
            textMesh.position.set(xPos - 0.06, yPos - 0.06, 0.12);
            textMesh.lookAt(0, 0, 1);
            clockGroup.add(textMesh);
        }

        minuteHandGroup = new THREE.Group();
        const minHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.8, 0.08),
            new THREE.MeshStandardMaterial({ color: 0x000000 })
        );
        minHand.position.set(0, 0.4, 0.04);
        enableShadows(minHand);
        minuteHandGroup.add(minHand);
        clockGroup.add(minuteHandGroup);

        hourHandGroup = new THREE.Group();
        const hrHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.6, 0.08),
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        hrHand.position.set(0, 0.3, 0.04);
        enableShadows(hrHand);
        hourHandGroup.add(hrHand);
        clockGroup.add(hourHandGroup);

        secondHandGroup = new THREE.Group();
        const secHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 1, 0.04),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        secHand.position.set(0, 0.5, 0);
        enableShadows(secHand);
        secondHandGroup.add(secHand);
        clockGroup.add(secondHandGroup);

        clockGroup.position.set(x, y, z + 0.1);
        room.add(clockGroup);
    }

    new FontLoader().load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
        createClock(-8, 10, -9.95, font);
    });

    return room;
}

