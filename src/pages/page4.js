import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function init() {
const room = new THREE.Group();

// 1. Create a TextureLoader
const textureLoader = new THREE.TextureLoader();

const wallColorTexture = textureLoader.load('public/textures/Tiles131_1K-JPG_Color.jpg');
const wallDisplacementTexture = textureLoader.load('public/textures/Tiles074_1K-JPG_Displacement.jpg');
const wallNormalTexture = textureLoader.load('public/textures/Tiles074_1K-JPG_NormalGL.jpg');
const wallRoughnessTexture = textureLoader.load('public/textures/Tiles074_1K-JPG_Roughness.jpg');

// 2. Load the texture image
[wallColorTexture, wallDisplacementTexture, wallNormalTexture, wallRoughnessTexture].forEach(texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2); 
});

// 3. Apply the texture to the wall material
const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    displacementMap: wallDisplacementTexture,
    displacementScale: 0.5, 
    normalMap: wallNormalTexture,
    roughnessMap: wallRoughnessTexture,
    
});

const wallSize = [20, 20, 0.5];

const wallBack = new THREE.Mesh(new THREE.BoxGeometry(...wallSize), wallMaterial);
wallBack.position.set(0, 10, -10);
room.add(wallBack);

const wallLeft = new THREE.Mesh(new THREE.BoxGeometry(...wallSize), wallMaterial);
wallLeft.rotation.y = Math.PI / 2;
wallLeft.position.set(-10, 10, 0);
room.add(wallLeft);

const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xF7F1E1 });
const floor1 = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 0.5), wallMaterial);
floor1.rotation.x = -Math.PI / 2;
floor1.position.set(0, 0.04, 0);
room.add(floor1);
const floor2 = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 0.15), floorMaterial);
floor2.rotation.x = -Math.PI / 2;
floor2.position.set(0, 0.20, 0);
room.add(floor2);

let newPendulumTime = 0;



// Table
const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const tableTop = new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 7), tableMaterial);
tableTop.position.set(0, 1.9, 2);
room.add(tableTop);

const legGeometry = new THREE.BoxGeometry(0.5, 2, 0.2);
for (let x of [-4, 3.4]) {
    for (let z of [0, 4]) {
        const leg = new THREE.Mesh(legGeometry, tableMaterial);
        leg.position.set(x, 0.8, z);
        room.add(leg);
    }
}

// Chair
const chairMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
const seat = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 3), chairMaterial);
seat.position.set(0, 1.15, -3);
room.add(seat);

const chairLegGeometry = new THREE.BoxGeometry(0.3, 1.1, 0.2);
for (let x of [-2, 1]) {
    for (let z of [-1.7, -3.5]) {
        const leg = new THREE.Mesh(chairLegGeometry, chairMaterial);
        leg.position.set(x + 0.5, 0.65, z - 0.5);
        room.add(leg);
    }
}

const backrest = new THREE.Mesh(new THREE.BoxGeometry(3, 2, -0.5), chairMaterial);
backrest.position.set(0, 2, -4.5);
room.add(backrest);

// Bookcase
const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
const shelfWidth = 9;
const shelfHeight = 12;
const shelfDepth = 1;
const shelfX = -4;
const shelfY = 6;
const shelfZ = -8.5;

const sideThickness = 0.1;
const sideLeft = new THREE.Mesh(new THREE.BoxGeometry(sideThickness, shelfHeight, shelfDepth), shelfMaterial);
sideLeft.position.set(shelfX - shelfWidth / 2 + sideThickness / 2, shelfY, shelfZ);
room.add(sideLeft);

const sideRight = new THREE.Mesh(new THREE.BoxGeometry(sideThickness, shelfHeight, shelfDepth), shelfMaterial);
sideRight.position.set(shelfX + shelfWidth / 2 - sideThickness / 2, shelfY, shelfZ);
room.add(sideRight);

const backPanel = new THREE.Mesh(new THREE.BoxGeometry(shelfWidth, shelfHeight, 0.02), shelfMaterial);
backPanel.position.set(shelfX, shelfY, shelfZ - shelfDepth / 2 + 0.01);
room.add(backPanel);

const topPanel = new THREE.Mesh(new THREE.BoxGeometry(shelfWidth, 0.1, shelfDepth), shelfMaterial);
topPanel.position.set(shelfX, shelfY + shelfHeight / 2 - 0.05, shelfZ);
room.add(topPanel);

const bottomPanel = new THREE.Mesh(new THREE.BoxGeometry(shelfWidth, 0.1, shelfDepth), shelfMaterial);
bottomPanel.position.set(shelfX, shelfY - shelfHeight / 2 + 0.05, shelfZ);
room.add(bottomPanel);

const numberOfShelves = 5;
const shelfGap = shelfHeight / numberOfShelves;
for (let i = 1; i < numberOfShelves; i++) {
    const shelfBoard = new THREE.Mesh(new THREE.BoxGeometry(shelfWidth - 0.02, 0.08, shelfDepth - 0.02), shelfMaterial);
    shelfBoard.position.set(shelfX, shelfY - shelfHeight / 2 + i * shelfGap, shelfZ);
    room.add(shelfBoard);
}

// Books
const bookMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xff4444 }),
    new THREE.MeshStandardMaterial({ color: 0x44aaff }),
    new THREE.MeshStandardMaterial({ color: 0x33cc66 }),
    new THREE.MeshStandardMaterial({ color: 0xffcc00 })
];

const bookWidth = 0.1, bookHeight = 1, bookDepth = 0.1;
const shelfIndex = 4;
const y = shelfY - shelfHeight / 2 + shelfIndex * shelfGap + 0.08;
const bookPositions = [-0.7, -0.55, 0.7, 0.5];

bookPositions.forEach((offsetX, idx) => {
    const book = new THREE.Mesh(new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth), bookMaterials[idx]);
    book.position.set(shelfX + offsetX, y + bookHeight / 2, shelfZ);
    room.add(book);
});

const extraBookMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xff6666 }),
    new THREE.MeshStandardMaterial({ color: 0x66ccff }),
    new THREE.MeshStandardMaterial({ color: 0x66ff66 }),
    new THREE.MeshStandardMaterial({ color: 0xffdd55 })
];

const extraBookWidth = 0.1;
const extraBookHeight = 1;
const extraBookDepth = 0.1;
const extraBookOffsetsX = [-0.7, -0.55, 0.7, 0.5];


const shelfIndicesToFill = [1, 2, 3]; 

shelfIndicesToFill.forEach((shelfIdx, shelfRow) => {
    const shelfYPos = shelfY - shelfHeight / 2 + shelfIdx * shelfGap + 0.08;

    extraBookOffsetsX.forEach((offsetX, offsetIdx) => {
        const bookColorIndex = (shelfRow * extraBookOffsetsX.length + offsetIdx) % extraBookMaterials.length;

        const extraBook = new THREE.Mesh(
            new THREE.BoxGeometry(extraBookWidth, extraBookHeight, extraBookDepth),
            extraBookMaterials[bookColorIndex]
        );

        extraBook.position.set(shelfX + offsetX, shelfYPos + extraBookHeight / 2, shelfZ);
        room.add(extraBook);
    });
});

// Chất liệu mới cho sách ở các ngăn dưới
const bottomShelfBookMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xcc6666 }),
    new THREE.MeshStandardMaterial({ color: 0x6699cc }),
    new THREE.MeshStandardMaterial({ color: 0x66cc99 }),
    new THREE.MeshStandardMaterial({ color: 0xffbb33 })
];


const bottomBookWidth = 0.1, bottomBookHeight = 1, bottomBookDepth = 0.1;

const bottomBookOffsetsX = [-0.6, -0.4, 0.2, 0.5];


const bottomShelfIndices = [1, 2, 3];

const bottomBoardThickness = 0.08; // độ dày kệ
const bottomBookGap = 0.02;

bottomShelfIndices.forEach((shelfIdx, shelfGroupIdx) => {
    const yPos = shelfY - shelfHeight / 2 + shelfIdx * shelfGap + bottomBoardThickness + bottomBookGap;

    bottomBookOffsetsX.forEach((offsetX, offsetIdx) => {
        const materialIdx = (shelfGroupIdx * bottomBookOffsetsX.length + offsetIdx) % bottomShelfBookMaterials.length;

        const bottomBook = new THREE.Mesh(
            new THREE.BoxGeometry(bottomBookWidth, bottomBookHeight, bottomBookDepth),
            bottomShelfBookMaterials[materialIdx]
        );

        bottomBook.position.set(shelfX + offsetX, yPos + bottomBookHeight / 2, shelfZ);
        room.add(bottomBook);
    });
});


// Laptop
const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(2, 0.05, 1.3), new THREE.MeshStandardMaterial({ color: 0x333333 }));
laptopBase.position.set(1, 0.1, 0.5);
const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(2, 1.6, 0.05), new THREE.MeshStandardMaterial({ color: 0x111111 }));
laptopScreen.position.set(1, 0.4, 0.8);
laptopScreen.rotation.x = -Math.PI / 4;
const laptop = new THREE.Group();
laptop.add(laptopBase);
laptop.add(laptopScreen);
laptop.position.set(-2, 1.98, -0.5);
room.add(laptop);

// AC
const acGroup = new THREE.Group();
const acBody = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 0.9), new THREE.MeshStandardMaterial({ color: 0xeeeeee }));
acGroup.add(acBody);
const vent = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.2, 1), new THREE.MeshStandardMaterial({ color: 0x222222 }));
vent.position.set(0, -0.2, 0.16);
acGroup.add(vent);
acGroup.position.set(5, 17.5, -9.76);
room.add(acGroup);


const clockX = 4;
const clockZ = -9;
const clockY = 3.5;

const clockMaterial = new THREE.MeshStandardMaterial({ color: 0x4b2e1f });


const clockBody = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 7, 1),
    clockMaterial
);
clockBody.position.set(clockX, clockY, clockZ);
room.add(clockBody);

// Mặt đồng hồ 
const clockFace = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32),
    new THREE.MeshStandardMaterial({ color: 0xffffee })
);
clockFace.rotation.x = Math.PI / 2;
clockFace.position.set(clockX, clockY + 2, clockZ + 0.5);
room.add(clockFace);

// Tạo group chứa quả lắc
const newPendulumGroup = new THREE.Group();
newPendulumGroup.position.set(4, 4.5, -8.5); 
room.add(newPendulumGroup);

const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 3, 12),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
);
rod.position.y = -1.5; 
newPendulumGroup.add(rod);

const bob = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffaa00 })
);
bob.position.y = -3; 
newPendulumGroup.add(bob);

const clockHandGroup = new THREE.Group();
clockHandGroup.position.set(clockX, clockY + 1.9, clockZ + 0.525); 
room.add(clockHandGroup);

const hourHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.5, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
);
hourHand.position.y = 0.1; 
clockHandGroup.add(hourHand);

const minuteHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.7, 0.03),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
);
minuteHand.position.y = 0.25; 
clockHandGroup.add(minuteHand);

return room;
}