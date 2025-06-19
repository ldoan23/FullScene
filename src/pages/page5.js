import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export function init(container) {
    const room = new THREE.Group();
    const scaleFactor = 0.5;
     // Floor Textures
    const loader = new THREE.TextureLoader();
    const texturePath = 'public/textures/'; 
    const colorMap = loader.load(texturePath + 'Concrete034_1K-JPG_Color.jpg');
    const roughnessMap = loader.load(texturePath + 'Concrete034_1K-JPG_Roughness.jpg');
    const normalMap = loader.load(texturePath + 'Concrete034_1K-JPG_NormalGL.jpg');
    const displacementMap = loader.load(texturePath + 'Concrete034_1K-JPG_Displacement.jpg');

    // Floor geometry (20x20)
    const floorGeometry = new THREE.PlaneGeometry(20, 20, 256, 256);
    floorGeometry.attributes.uv2 = floorGeometry.attributes.uv;

    const floorMaterial = new THREE.MeshStandardMaterial({
        map: colorMap,
        roughnessMap: roughnessMap,
        normalMap: normalMap,
        displacementMap: displacementMap,
        roughness: 1.0,
        metalness: 0.0,
        displacementScale: 0.15 * scaleFactor,
        side: THREE.DoubleSide 
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    room.add(floor);

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
    const wallHeight = 10; 
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

    // Bed 
    const bedWidth = 4;
    const bedHeight = 1;
    const bedLength = 5;
    const bedPositionZ = -9.95; 
    
    // Bed Frame
    const bedFrame = new THREE.Mesh(
        new THREE.BoxGeometry(bedWidth, bedHeight, bedLength),
        new THREE.MeshStandardMaterial({ color: 0x4b2a10 })
    );
    bedFrame.position.set(0, bedHeight/2, bedPositionZ);
    enableShadows(bedFrame);
    room.add(bedFrame);
    
    // Mattress
    const mattress = new THREE.Mesh(
        new THREE.BoxGeometry(bedWidth-0.2, 0.3, bedLength-0.2),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
    );
    mattress.position.set(0, bedHeight + 0.15, bedPositionZ);
    enableShadows(mattress);
    room.add(mattress);
    
    // Blanket 
    const blanket = new THREE.Mesh(
        new THREE.BoxGeometry(bedWidth-0.2, 0.075, (bedLength-0.2)*0.7),
        new THREE.MeshStandardMaterial({ color: 0x4682B4 })
    );
    blanket.position.set(0, bedHeight + 0.35, bedPositionZ + (bedLength*0.15)); 
    enableShadows(blanket);
    room.add(blanket);
    
    // Pillow 
    const pillowGeometry = new THREE.BoxGeometry(1, 0.2, 1.15);
    const pillowMaterial = new THREE.MeshStandardMaterial({ color: 0x87CEEB });
    
    const pillow1 = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow1.position.set(0.9, bedHeight + 0.35, bedPositionZ - bedLength/2 + 0.6); 
    pillow1.rotation.y = Math.PI/2;
    enableShadows(pillow1);
    room.add(pillow1);
    
    const pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow2.position.set(-0.9, bedHeight + 0.35, bedPositionZ - bedLength/2 + 0.6);
    pillow2.rotation.y = Math.PI/2;
    enableShadows(pillow2);
    room.add(pillow2);
    
    // Head Board
    const headboard = new THREE.Mesh(
        new THREE.BoxGeometry(bedWidth, 1.5, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x4b2a10 })
    );
    headboard.position.set(0, bedHeight + 0.75, bedPositionZ - bedLength/2 + 0.05);
    enableShadows(headboard);
    room.add(headboard);
    
    // Table 
    const tableWidth = 1.5;
    const tableHeight = 1.25;
    const tableLength = 1.5;
    
    const table = new THREE.Mesh(
        new THREE.BoxGeometry(tableWidth, tableHeight, tableLength),
        new THREE.MeshStandardMaterial({ color: 0x4b2a10 })
    );
    table.position.set(bedWidth/2 + tableWidth/2 + 0.25, tableHeight/2, bedPositionZ - 0.5);
    enableShadows(table);
    room.add(table);
    
    // Lamp 
    const lampBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.15, 32),
        new THREE.MeshStandardMaterial({ color: 0x696969 })
    );
    lampBase.position.set(bedWidth/2 + tableWidth/2 + 0.25, tableHeight + 0.075, bedPositionZ - 0.5);
    enableShadows(lampBase);
    room.add(lampBase);
    
    const lampPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.6, 32),
        new THREE.MeshStandardMaterial({ color: 0x696969 })
    );
    lampPole.position.set(bedWidth/2 + tableWidth/2 + 0.25, tableHeight + 0.3, bedPositionZ - 0.5);
    enableShadows(lampPole);
    room.add(lampPole);
    
    const lampShade = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.4, 0.5),
        new THREE.MeshStandardMaterial({ color: 0xFFD700, transparent: true, opacity: 0.7 })
    );
    lampShade.position.set(bedWidth/2 + tableWidth/2 + 0.25, tableHeight + 0.75, bedPositionZ - 0.5);
    lampShade.rotation.x = Math.PI;
    enableShadows(lampShade);
    room.add(lampShade);

    // Wardrobe 
    const wardrobe = new THREE.Mesh(
        new THREE.BoxGeometry(6, 4.5, 1.5), 
        new THREE.MeshStandardMaterial({ color: 0x4b2a10 })
    );
    wardrobe.position.set(-6.5, 2.25, -9.2);
    room.add(wardrobe);

    // Wardrobe Doors
    function createDoor(xOffset) {
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(1.45, 3.25, 0.025),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        door.position.set(-6.5 + xOffset, 2.825, -8.45);
        room.add(door);
    }

    createDoor(-0.75);
    createDoor(0.75);

    const door1 = new THREE.Mesh(
        new THREE.BoxGeometry(1.45, 4.45, 0.025),
        new THREE.MeshStandardMaterial({ color: 0xffffff})
    );
    door1.position.set(-4.25, 2.25, -8.45);
    room.add(door1);

    const door2 = new THREE.Mesh(
        new THREE.BoxGeometry(1.45, 4.45, 0.025),
        new THREE.MeshStandardMaterial({ color: 0xffffff})
    );
    door2.position.set(-8.75, 2.25, -8.45);
    room.add(door2);

    const door3 = new THREE.Mesh(
        new THREE.BoxGeometry(2.9, 1.1, 0.025),
        new THREE.MeshStandardMaterial({ color: 0xffffff})
    );
    door3.position.set(-6.5, 0.6, -8.45);
    room.add(door3);

    // Wardrobe Handles
    function createHandle(xOffset) {
        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.025, 0.025, 0.15, 16),
            new THREE.MeshStandardMaterial({ color: 0x222222 })
        );
        handle.rotation.z = Math.PI/2;
        handle.position.set(-6.5 + xOffset, 2.9, -8.45);
        room.add(handle);
    }

    createHandle(-0.3);
    createHandle(0.3);

    const handle1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.15, 16),
        new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    handle1.rotation.z = Math.PI/2;
    handle1.position.set(-4.7, 2.25, -8.45);
    room.add(handle1);

    const handle2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.15, 16),
        new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    handle2.rotation.z = Math.PI/2;
    handle2.position.set(-8.3, 2.25, -8.45);
    room.add(handle2);

    const handle3 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.5, 16),
        new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    handle3.rotation.z = Math.PI/2;
    handle3.position.set(-6.5, 0.5, -8.45);
    room.add(handle3);

    // TV Screen
    const tvScreen = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 2.4, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    tvScreen.position.set(0, 1.7, 5);
    room.add(tvScreen);

    // TV Stand
    const tvStand = new THREE.Mesh(
        new THREE.BoxGeometry(5, 1.5, 2.5),
        new THREE.MeshStandardMaterial({ color: 0xf8f8f8})
    );
    tvStand.position.set(0, 0.75, 5);
    room.add(tvStand);

    // Air Conditioner
    const AC = new THREE.Mesh(
        new THREE.BoxGeometry(5, 1.5, 1),
        new THREE.MeshStandardMaterial({ color: 0xf8f8f8})
    );
    AC.position.set(-9.5, 7.5, -5);
    AC.rotation.y = Math.PI/2;
    room.add(AC);

    // Desk 
    function createDesk(x = 9.5, z = 3.5, rotationY = 0) {
        const deskGroup = new THREE.Group();
        const deskTop = new THREE.Mesh(
            new THREE.BoxGeometry(3.5, 0.25, 2),
            new THREE.MeshStandardMaterial({ color: 0xE0E0E0 })
        );
        deskTop.position.set(0, 1.55, -17);
        enableShadows(deskTop);
        deskGroup.add(deskTop);

        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });
        const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.6, 16);
        const positions = [
            [-1.5, 0.625, -0.075], [1.5, 0.625, -0.075],
            [-1.5, 0.625, 1.5], [1.5, 0.625, 1.5]
        ];
        positions.forEach(([dx, dy, dz]) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(dx, dy, dz - 17.75);
            enableShadows(leg);
            deskGroup.add(leg);
        });

        deskGroup.position.set(x + 0.65, 0, z - 1.5);
        deskGroup.rotation.y = rotationY;
        room.add(deskGroup);
    }

    // Chair
    function createChair(x = 8.5, z = 3.5, rotationY = 0) {
        const chairGroup = new THREE.Group();
        const seat = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.25, 1.5),
            new THREE.MeshStandardMaterial({ color: 0x654321 })
        );
        seat.position.set(0, 0.85, 0);
        enableShadows(seat);
        chairGroup.add(seat);

        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });
        const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.85, 16);
        const positions = [
            [-0.625, 0.375, -0.625], [0.625, 0.375, -0.625],
            [-0.625, 0.375, 0.625], [0.625, 0.375, 0.625]
        ];
        positions.forEach(([dx, dy, dz]) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(dx, dy, dz);
            enableShadows(leg);
            chairGroup.add(leg);
        });

        const back = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 1.75, 0.2),
            new THREE.MeshStandardMaterial({ color: 0x654321 })
        );
        back.position.set(0, 1.6, 0.65);
        enableShadows(back);
        chairGroup.add(back);

        chairGroup.position.set(x - 13.5, 0, z - 1.5);
        chairGroup.rotation.y = rotationY;
        room.add(chairGroup);
    }

    createDesk(7.5, 2.5, Math.PI/2);  
    createChair(6.5, 2.5, Math.PI/2);

    // Clock
    let minuteHandGroup, hourHandGroup, secondHandGroup;

    function createClock(x, y, z, font) {
        const clockGroup = new THREE.Group();

        const face = new THREE.Mesh(
            new THREE.CircleGeometry(1.065, 32),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        enableShadows(face);
        clockGroup.add(face);

        const ring = new THREE.Mesh(
            new THREE.RingGeometry(1.065, 1.165, 32),
            new THREE.MeshStandardMaterial({ color: 0x000000 })
        );
        enableShadows(ring);
        clockGroup.add(ring);

        for (let i = 1; i <= 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 0.835;
            const xPos = Math.sin(angle) * radius;
            const yPos = Math.cos(angle) * radius;

            const textGeo = new TextGeometry(i.toString(), {
                font: font,
                size: 0.1,
                height: 0.0165,
            });

            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
            const textMesh = new THREE.Mesh(textGeo, textMaterial);
            textMesh.position.set(xPos - 0.05, yPos - 0.05, 0.1);
            textMesh.lookAt(0, 0, 1);
            clockGroup.add(textMesh);
        }

        minuteHandGroup = new THREE.Group();
        const minHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.065, 0.665, 0.065),
            new THREE.MeshStandardMaterial({ color: 0x000000 })
        );
        minHand.position.set(0, 0.335, 0.035);
        enableShadows(minHand);
        minuteHandGroup.add(minHand);
        clockGroup.add(minuteHandGroup);

        hourHandGroup = new THREE.Group();
        const hrHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.065, 0.5, 0.065),
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        hrHand.position.set(0, 0.25, 0.035);
        enableShadows(hrHand);
        hourHandGroup.add(hrHand);
        clockGroup.add(hourHandGroup);

        secondHandGroup = new THREE.Group();
        const secHand = new THREE.Mesh(
            new THREE.BoxGeometry(0.0335, 0.835, 0.0335),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        secHand.position.set(0, 0.415, 0);
        enableShadows(secHand);
        secondHandGroup.add(secHand);
        clockGroup.add(secondHandGroup);

        clockGroup.position.set(x, y, z);
        room.add(clockGroup);
    }

    new FontLoader().load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
        createClock(-6.665, 8.335, -9.965, font);
    });

    return room;
}