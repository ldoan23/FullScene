//Ho ten: DOAN NGOC LINH, MSSV: 20233862
import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function init() {
  const room = new THREE.Group();

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFC});
    const wallSize = [ 20.5, 20, 1];

    const wallBack1 = new THREE.Mesh(new THREE.BoxGeometry(20.5,9,1), wallMaterial);
    wallBack1.position.set(0,5,-10);
    room.add(wallBack1);

    const wallBack2 = new THREE.Mesh(new THREE.BoxGeometry(20.5,4,1), wallMaterial);
    wallBack2.position.set(0,18,-10);
    room.add(wallBack2);

    const wallBackL = new THREE.Mesh(new THREE.BoxGeometry(6,20,1), wallMaterial);
    wallBackL.position.set(-7.1,10,-10);
    room.add(wallBackL);
    const wallBackR = new THREE.Mesh(new THREE.BoxGeometry(4,20,1), wallMaterial);
    wallBackR.position.set(8.25,10,-10);
    room.add(wallBackR);

    const wallLeft = new THREE.Mesh( new THREE.BoxGeometry(...wallSize), wallMaterial);
    wallLeft.rotation.y = Math.PI / 2 ;
    wallLeft.position.set(-10,10,0);
    room.add(wallLeft);

    function createWindowFrame(x, y, z, width, height, depth ) {
        const windowGroup = new THREE.Group();

        // Khung ngoài
        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B }); // Màu gỗ
        const frameThickness = 0.2;

        const horizontalFrameGeo = new THREE.BoxGeometry(width, frameThickness, depth);
        const verticalFrameGeo = new THREE.BoxGeometry(frameThickness, height, depth);

        // Trên & dưới
        const frameTop = new THREE.Mesh(horizontalFrameGeo, frameMaterial);
        frameTop.position.set(0, height / 2 - frameThickness / 2, 0);
        windowGroup.add(frameTop);

        const frameBottom = new THREE.Mesh(horizontalFrameGeo, frameMaterial);
        frameBottom.position.set(0, -height / 2 + frameThickness / 2, 0);
        windowGroup.add(frameBottom);

        // Trái & phải
        const frameLeft = new THREE.Mesh(verticalFrameGeo, frameMaterial);
        frameLeft.position.set(-width / 2 + frameThickness / 2, 0, 0);
        windowGroup.add(frameLeft);

        const frameRight = new THREE.Mesh(verticalFrameGeo, frameMaterial);
        frameRight.position.set(width / 2 - frameThickness / 2, 0, 0);
        windowGroup.add(frameRight);

        // Kính
        const glassGeometry = new THREE.PlaneGeometry(width - frameThickness * 2, height - frameThickness * 2);
        const glassMaterial = new THREE.MeshStandardMaterial({
            color: 0xddddff,
            transparent: true,
            opacity: 0.3,
            roughness: 0.1,
            metalness: 0.1,
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.set(0, 0, -0.01); // Đặt sát bên trong khung
        windowGroup.add(glass);

        windowGroup.position.set(x, y, z);
        room.add(windowGroup);
    }

    // Thêm cửa sổ vào tường bên phải (có thể tùy chỉnh lại cho đúng vị trí bạn muốn)
    createWindowFrame(1, 12.7, -10, 10.2, 6.4, 1.2);


    const floorMaterial= new THREE.MeshStandardMaterial({color: 0xF9F5EC});
    const floor1 = new THREE.Mesh( new THREE.BoxGeometry(20.5,20.5,1), wallMaterial);
    floor1.rotation.x= - Math.PI /2;
    floor1.position.set(0,0.48,0);
    floor1.receiveShadow = true;
    room.add(floor1);
    const floor2 = new THREE.Mesh( new THREE.BoxGeometry(20.5,10.25*2,0.15*2), floorMaterial);
    floor2.rotation.x= - Math.PI /2;
    floor2.position.set(0,1.1,0);
    floor2.receiveShadow = true;
    room.add(floor2);

    const gridHelper = new THREE.GridHelper(9.8*2,5*2, 0xFCFCFC, 0xFCFCFC);
    gridHelper.position.set(0.21*2,0.635*2,0.21*2);
    room.add(gridHelper);

    const tableTopGeometry = new THREE.BoxGeometry(10, 0.4, 5);
    const tableTopMaterial = new THREE.MeshStandardMaterial({ color:0xFFFFFC });

    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.rotation.y= Math.PI/2;
    tableTop.position.set(4.5,4,1);
    room.add(tableTop);

    const textureL = new THREE.TextureLoader();
    const TextureL = textureL.load('public/textures/T2.jpg')
    const legGeometry = new THREE.CylinderGeometry(1, 1, 4, 16);
    const legMaterial = new THREE.MeshStandardMaterial({ map: TextureL });
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(4.5,2,1);
    room.add(leg);
        
    //tu lanh
    const refriLoader = new THREE.TextureLoader();
    const refriTexture = refriLoader.load('public/textures/t3.jpg');
    const l = 13, w = 8;
    const shape = new THREE.Shape();
    shape.moveTo( 0, 0);
    shape.lineTo(0,w);
    shape.lineTo(l,w);
    shape.lineTo(l,0);
    shape.lineTo(0,0);
    const setting = {
        steps:10 ,
        depth: 3 ,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 2,
        bevelOffset:-3.5 ,
        bevelSegments:100,
    };


    const geo = new THREE.ExtrudeGeometry( shape, setting);
    const mat = new THREE.MeshStandardMaterial({map : refriTexture});
    const refri = new THREE.Mesh(geo, mat);
    refri.rotation.z= Math.PI/2;
    refri.position.set(-2.8,-0.5,-8.5);
    room.add(refri);

    //tay nam


    const geometry = new THREE.CapsuleGeometry( 0.1, 1, 4, 8 ); 
    const material = new THREE.MeshStandardMaterial( {color: 0x000000} ); 
    const capsule = new THREE.Mesh( geometry, material ); 
    capsule.position.set(-4.3,7.5,-5.5)
    room.add( capsule );
    //bep
    // ====== Bếp nấu (đối diện bàn, sát tường, cạnh tủ lạnh) ======

    // Thân bếp
    const stoveBodyGeometry = new THREE.BoxGeometry(5, 5, 10);
    const stoveBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xc2c2b4 }); // Màu kem
    const stoveBody = new THREE.Mesh(stoveBodyGeometry, stoveBodyMaterial);
    stoveBody.position.set(-7, 2.9, 0.6); // Bên trái tủ lạnh
    stoveBody.rotation.y = 0; // Không xoay
    room.add(stoveBody);

    // Mặt bếp
    const textureLoader = new THREE.TextureLoader();
    const stoveTexture = textureLoader.load('public/textures/t4.jpg')
    const stoveTopGeometry = new THREE.BoxGeometry(5, 0.2, 10);
    const stoveTopMaterial = new THREE.MeshStandardMaterial({ map: stoveTexture }); // Màu sáng hơn
    const stoveTop = new THREE.Mesh(stoveTopGeometry, stoveTopMaterial);
    stoveTop.position.set(-7, 5.5, 0.6);
    room.add(stoveTop);
    //ke bep
    const textureKe = new THREE.TextureLoader();
    const KeTexture = textureKe.load('public/textures/T2.jpg')
    const KeGeometry = new THREE.BoxGeometry(2.5, 0.5, 14.4);
    const KeMaterial = new THREE.MeshStandardMaterial({ map: KeTexture }); // Màu sáng hơn
    const Ke = new THREE.Mesh(KeGeometry, KeMaterial);
    Ke.position.set(-8.4, 9, 2.8);
    room.add(Ke);

    // Mặt bếp từ (hình chữ nhật)
    const stoveTopGeo = new THREE.BoxGeometry(4, 0.1, 6);
    const stoveTopMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4, metalness: 0.6 });
    const stoveTopMesh = new THREE.Mesh(stoveTopGeo, stoveTopMat);
    stoveTopMesh.position.set(-7, 5.6, 0.6); // Vị trí mặt bếp từ
    room.add(stoveTopMesh);

    // Vùng nấu 1 (hình tròn)
    const stoveCircleGeo1 = new THREE.CircleGeometry(0.8, 32);
    const stoveCircleMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const stoveCircle1 = new THREE.Mesh(stoveCircleGeo1, stoveCircleMat);
    stoveCircle1.rotation.x = -Math.PI / 2;
    stoveCircle1.position.set(-7, 5.7, -0.8
    );
    room.add(stoveCircle1);

    // Vùng nấu 2 (hình tròn)
    const stoveCircleGeo2 = new THREE.CircleGeometry(0.8, 32);
    const stoveCircle2 = new THREE.Mesh(stoveCircleGeo2, stoveCircleMat);
    stoveCircle2.rotation.x = -Math.PI / 2;
    stoveCircle2.position.set(-7, 5.7, 1.8);
    room.add(stoveCircle2);
    //bon rua
    const silkBodyGeometry = new THREE.BoxGeometry(5, 3, 4.5);
    const silkBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xc2c2b4 }); // Màu kem
    const silkBody = new THREE.Mesh(silkBodyGeometry, silkBodyMaterial);
    silkBody.position.set(-7, 2.7, 7.8); // Bên trái tủ lạnh
    silkBody.rotation.y = 0; // Không xoay
    room.add(silkBody);
    const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0xc2c2b4 }); // Viền có màu khác nhẹ để phân biệt
    const thickness = 0.4;
    const height = 1.2;
    const width = 5;
    const depth = 4.5;

    // Viền trước
    const frontEdge = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, thickness),
      edgeMaterial
    );
    frontEdge.position.set(-7, 4.8, 7.8 - depth / 2 + thickness / 2);
    room.add(frontEdge);

    // Viền sau
    const backEdge = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, thickness),
      edgeMaterial
    );
    backEdge.position.set(-7, 4.8, 7.8 + depth / 2 - thickness / 2);
    room.add(backEdge);

    // Viền trái
    const leftEdge = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, depth - thickness * 2),
      edgeMaterial
    );
    leftEdge.position.set(-7 - width / 2 + thickness / 2, 4.8, 7.8);
    room.add(leftEdge);

    // Viền phải
    const rightEdge = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, depth - thickness * 2),
      edgeMaterial
    );
    rightEdge.position.set(-7 + width / 2 - thickness / 2, 4.8, 7.8);
    room.add(rightEdge);

    // Vật liệu kim loại sáng
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      metalness: 1,
      roughness: 0.2
    });

    // Thân đứng
    const verticalPart = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 1, 32),
      metalMaterial
    );
    verticalPart.position.set(-9.3, 5.9, 7.8); // Trên bồn
    room.add(verticalPart);

    // Phần cong
    const curvePart = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.15, 16, 100, Math.PI),
      metalMaterial
    );
    curvePart.rotation.set(0, 0, 0);
    curvePart.position.set(-8.85, 6.4, 7.8); // Đỉnh vòi cong ra trước
    room.add(curvePart);

    // Thân ngang (ra ngoài)
    const horizontalPart = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.4, 32),
      metalMaterial
    );
    horizontalPart.rotation.x = Math.PI / 2;
    horizontalPart.position.set(-9.3, 6, 8.1); // Nối với cong
    room.add(horizontalPart);

    // Tay vặn nước
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.5, 32),
      metalMaterial
    );
    handle.position.set(-9.2, 6.35, 8.2); // Tay vặn bên phải
    room.add(handle);

    // Đầu vòi
    const nozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.1, 32),
      metalMaterial
    );
    nozzle.position.set(-8.4, 6.4, 7.8); // Đầu vòi nước
    room.add(nozzle);

    //ghe
    function createChair(x, y, z, rotationY) {
        const chair = new THREE.Group();

        // Mặt ghế
        const seatGeometry = new THREE.BoxGeometry(2.4, 0.35, 2.4);
        const seatMaterial = new THREE.MeshStandardMaterial({color: 0xA8A598 });
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.set(0, 0.8, 0);
        chair.add(seat);

        // Lưng ghế
        const backGeometry = new THREE.BoxGeometry(2.4, 2.4, 0.35);
        const backMaterial = new THREE.MeshStandardMaterial({ color: 0xA8A598});
        const back = new THREE.Mesh(backGeometry, backMaterial);
        back.position.set(0, 1.9, -1.05);
        chair.add(back);

        // Tạo chân ghế (4 chân)
        const legGeometry = new THREE.CylinderGeometry(0.12, 0.12, 1.9, 16);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

        const legPositions = [
            [-0.8, 0, -0.8], // Chân trước trái
            [0.8, 0, -0.8],  // Chân trước phải
            [-0.8, 0, 0.8],  // Chân sau trái
            [0.8, 0, 0.8],   // Chân sau phải
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos[0], -0.2, pos[2]);
            chair.add(leg);
        });

        chair.position.set(x, y, z);
        chair.rotation.y = rotationY;
        room.add(chair);
    }

    // Ghế 1 - đầu bàn
    createChair(4.5, 2.2, -3.5, 0);

    // Ghế 2 - đầu bàn
    createChair(4.5, 2.2, 5.5, Math.PI);

    // Ghế 3 - cạnh dài bên phải
    createChair(7.5, 2.2, 1, -Math.PI / 2);

    // Ghế 4 - cạnh dài bên trái
    createChair(1.5, 2.2, 1, Math.PI / 2);

    // === Tạo lọ hoa gồm nhiều cành riêng biệt ===
    const vaseGroup = new THREE.Group();

    // === Lọ nhỏ trong suốt ===
    const vaseGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.6, 32);
    const vaseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 1,
        transparent: true,
        opacity: 1,
        thickness: 0.5
    });
    const vaseMesh = new THREE.Mesh(vaseGeometry, vaseMaterial);
    vaseMesh.position.y = 0.8; // Đặt lọ đúng tâm
    vaseGroup.add(vaseMesh);

    const flowerPivots = []; // Lưu danh sách pivot để animate sau

    function createFlowerStem() {
        const pivot = new THREE.Object3D(); // Trục để đung đưa
        const flowerGroup = new THREE.Group();

        // Thân cây
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2, 8), stemMaterial);
        stem.position.y = 1.2;
        flowerGroup.add(stem);

        // Hoa
        const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0xffa6c9 });
        const flower = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), flowerMaterial);
        flower.position.y = 2.4 -0.1 * Math.random();
        flowerGroup.add(flower);

        pivot.add(flowerGroup); // Gắn vào pivot để quay được
        flowerPivots.push(pivot); 

        return pivot;
    }

    // === Nhân bản nhiều cành hoa, đặt quanh miệng lọ ===
    const flowerCount = 8;
    const radius = 0.2;
    for (let i = 0; i < flowerCount; i++) {
        const angle = (i / flowerCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.05;
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.05;

        const flower = createFlowerStem();
        flower.position.set(x, 0.4, z); // Gốc thân đặt trên miệng lọ
        flower.rotation.x = (Math.random() - 0.5) * 0.3;
        flower.rotation.z = (Math.random() - 0.5) * 0.3;
        vaseGroup.add(flower);
    }

    // === Đặt lọ hoa giữa bàn ăn ===
    vaseGroup.position.set(4.5, 4.2, 1);
    room.add(vaseGroup);

    function createSpiceJar(x, y, z, scale = 1.5) {
        const jarGroup = new THREE.Group();

        // Thân lọ
        const jarGeometry = new THREE.CylinderGeometry(0.25 * scale, 0.25 * scale, 0.6 * scale, 16);
        const jarMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
        const jarBody = new THREE.Mesh(jarGeometry, jarMaterial);
        jarBody.position.y = 0.3 * scale;
        jarGroup.add(jarBody);

        // Nắp gỗ
        const lidGeometry = new THREE.CylinderGeometry(0.27 * scale, 0.27 * scale, 0.1 * scale, 16);
        const lidMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
        const lid = new THREE.Mesh(lidGeometry, lidMaterial);
        lid.position.y = 0.63 * scale;
        jarGroup.add(lid);

        jarGroup.position.set(x, y, z);
        room.add(jarGroup);
    }
    createSpiceJar(-8.3, 9.1, 8);



    function createSpiceJar2(x, y, z, scale = 2) {
        const jarGroup1 = new THREE.Group();

        // Thân lọ
        const jarGeometry1 = new THREE.CylinderGeometry(0.25 * scale, 0.25 * scale, 0.6 * scale, 16);
        const jarMaterial1 = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
        const jarBody1 = new THREE.Mesh(jarGeometry1, jarMaterial1);
        jarBody1.position.y = 0.3 * scale;
        jarGroup1.add(jarBody1);

        // Nắp gỗ
        const lidGeometry1 = new THREE.CylinderGeometry(0.27 * scale, 0.27 * scale, 0.1 * scale, 16);
        const lidMaterial1 = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
        const lid1 = new THREE.Mesh(lidGeometry1, lidMaterial1);
        lid1.position.y = 0.63 * scale;
        jarGroup1.add(lid1);

        jarGroup1.position.set(x, y, z);
        room.add(jarGroup1);
    }
    createSpiceJar2(-8.3, 9.1, 7);
    room.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;       
            child.receiveShadow = true;    
        }
    });

    const waterGeometry = new THREE.PlaneGeometry(4, 4);

    const waLoader = new THREE.TextureLoader();
    const waterNormal = waLoader.load('public/textures/t7.jpg'); 
    waterNormal.wrapS = waterNormal.wrapT = THREE.RepeatWrapping;

    const waterMaterial = new THREE.MeshStandardMaterial({
        transparent: true,
        map: waterNormal
    });

    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.set(-7,5, 8); 

    room.add(water);

    return room;
}
