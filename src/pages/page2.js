// AUTHOR: NGUYEN PHAN ANH- ID: 20233828
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export function init(container) {
    const room = new THREE.Group();
        const objects = []; 
        
        const BGtextureLoader = new THREE.TextureLoader();
        const bgTexture = BGtextureLoader.load('public/textures/drakensberg_solitary_mountain_puresky.jpg'); 
        room.background = bgTexture;

        // wall brick
        const wallWidth = 20;
        const wallHeigth = 1;
        const wallDepth = 0.5;
        const walltextureLoader = new THREE.TextureLoader();
        const walltexture = walltextureLoader.load('public/textures/white-bricks-wall-texture.jpg');
        walltexture.colorSpace = THREE.SRGBColorSpace;
        // Gán texture vào vật liệu
        const wallmaterial = new THREE.MeshBasicMaterial({ map: walltexture });
        
        //wall 1 2
        const wallX = new THREE.Mesh(new THREE.BoxGeometry(wallDepth,wallHeigth,wallWidth), wallmaterial);
        const wallY = new THREE.Mesh(new THREE.BoxGeometry(wallDepth,wallHeigth,25), wallmaterial);
        walltexture.wrapS = THREE.RepeatWrapping;
        walltexture.wrapT = THREE.RepeatWrapping;
        walltexture.repeat.set(0.8, 0.3);
        //wall position
        wallX.position.set(-10, 15 + 20, 0);
        wallY.position.set(2.5, 15 + 20, -10);
        wallY.rotation.y = Math.PI / 2;
        wallX.receiveShadow =true;
        wallY.receiveShadow = true;
        room.add(wallX,wallY);
        
        //wall smooth
        const wallWidthsm = 20;
        const wallHeigthsm = 15;
        const wallDepthsm = 0.2;
        const wallsmtextureLoader = new THREE.TextureLoader();
        const wallsmoothtexture = wallsmtextureLoader.load('public/textures/4K-wallpaper_42_base_color.png');
        const wallsmoothrough = wallsmtextureLoader.load('public/textures/ukjjaioo_4K_Roughness.jpg');
        const wallsmoothnorm = wallsmtextureLoader.load('public/textures/ukjjaioo_4K_Normal.jpg');
        
        wallsmoothtexture.wrapS = THREE.RepeatWrapping;
        wallsmoothtexture.wrapT = THREE.RepeatWrapping;
        wallsmoothtexture.repeat.set(0.5, 0.5);

        wallsmoothrough.wrapS = THREE.RepeatWrapping;
        wallsmoothrough.wrapT = THREE.RepeatWrapping;
        wallsmoothrough.repeat.set(2, 2);

        wallsmoothnorm.wrapS = THREE.RepeatWrapping;
        wallsmoothnorm.wrapT = THREE.RepeatWrapping;
        wallsmoothnorm.repeat.set(2, 2);
    
        const wallsmmaterial = new THREE.MeshStandardMaterial({ 
            map: wallsmoothtexture,
            normalmap: wallsmoothnorm,
            roughnessmap: wallsmoothrough,
            roughness: 1.0,
            metalness: 0.3,

        });
        
        //wall 1 2
        const wallsmX = new THREE.Mesh(new THREE.BoxGeometry(wallDepthsm,6,wallWidthsm), wallsmmaterial);
        const wallsmY = new THREE.Mesh(new THREE.BoxGeometry(wallDepthsm,wallHeigthsm,25), wallsmmaterial);
        const wallsm1 = new THREE.Mesh(new THREE.BoxGeometry(wallDepthsm,wallHeigthsm,1), wallsmmaterial);
        const wallsm2 = new THREE.Mesh(new THREE.BoxGeometry(wallDepthsm,wallHeigthsm,1), wallsmmaterial);
        const wallsm3 = new THREE.Mesh(new THREE.BoxGeometry(wallDepthsm,wallHeigthsm,1), wallsmmaterial);
        const wallsm4 = new THREE.Mesh(new THREE.BoxGeometry(wallDepthsm,wallHeigthsm,1), wallsmmaterial);
        const wallsmup = new THREE.Mesh(new THREE.BoxGeometry(wallDepthsm,1,20), wallsmmaterial);
        //wall position
        wallsmX.position.set(-10, 3 + 20, 0);
        wallsmY.position.set(2.5, 7.5 + 20, -10);
        wallsm1.position.set(-10, 8 + 20, 3);
        wallsm2.position.set(-10, 8 + 20, -3);
        wallsm3.position.set(-10, 8 + 20, 9.5);
        wallsm4.position.set(-10, 8 + 20, -9.5);
        wallsmup.position.set(-10, 14 + 20, 0);
        wallsmY.rotation.y = Math.PI / 2;

        wallsmY.receiveShadow = true;
        room.add(wallsmY,wallsmX,wallsm1,wallsm2,wallsm3,wallsmup,wallsm4);

    //FLoor
    const textureLoader = new THREE.TextureLoader();
        // Load texture 
        const floortexture = textureLoader.load('public/textures/wood_floor_disp_4k.png');
        floortexture.colorSpace = THREE.SRGBColorSpace; 
        const floordispl = textureLoader.load('public/textures/wood_floor_disp_4k.png');
        

        floortexture.wrapS = THREE.RepeatWrapping;
        floortexture.wrapT = THREE.RepeatWrapping;
        floortexture.repeat.set(4, 4);

        floordispl.wrapS = THREE.RepeatWrapping;
        floordispl.wrapT = THREE.RepeatWrapping;
        floordispl.repeat.set(4, 4);

        const floormaterial = new THREE.MeshStandardMaterial({
        map: floortexture,
        displacementMap: floordispl,
        displacementScale: 0.1, 
        roughness: 3, 
        metalness: 0.5 
        });
        // 
        const floor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.2, 25, 100, 1, 100), floormaterial);
        floor.position.set(2.5,0 + 20,0);
        floor.rotation.x = -Math.PI ; 
        floor.rotation.y = -Math.PI / 2;
        floor.receiveShadow = true;
        room.add(floor);

        //window
        const loader = new THREE.TextureLoader();
        const envTexture = loader.load('public/textures/drakensberg_solitary_mountain_puresky.jpg');
        envTexture.mapping = THREE.EquirectangularReflectionMapping;

        const glassmaterial = new THREE.MeshPhysicalMaterial();
        glassmaterial.color = new THREE.Color(1,1,1) 
        glassmaterial.transmission = 1.0;
        glassmaterial.roughness = 0;
        glassmaterial.ior = 1.7;
        glassmaterial.thickness = 0.5;
        glassmaterial.specularIntensity = 1.0;
        glassmaterial.clearcoat = 1.0;
        glassmaterial.envMap = envTexture;
        const winheight = 10;
        const winwidth = 20;

        const window1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, winheight, winwidth), glassmaterial);
        window1.position.set(-10, 10 + 20, 0);
        window1.rotation.y = Math.PI  ;
        room.add(window1);

        // Thêm ánh sáng chiếu từ cửa sổ
        const windowLight = new THREE.DirectionalLight('#fff8e7', 0.8); 
        windowLight.position.set(window1.position.x , window1.position.y + 10, window1.position.z + 5); 
        windowLight.target.position.set(0, 0, -5); 
        windowLight.castShadow = true; 
        room.add(windowLight);
        room.add(windowLight.target);

        //TV
        const TVmaterial = new THREE.MeshStandardMaterial({color:'#000000'});
        const TV = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 0.2), TVmaterial);
        TV.position.set(6,6 + 20, -9.8);
        //screen
        const textureLoader1 = new THREE.TextureLoader();
        const screen = textureLoader1.load('public/textures/wallpaperflare.com_wallpaper (1).jpg');
        const screenmaterial = new THREE.MeshStandardMaterial({
            map: screen,
        });
        const tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 2.8), screenmaterial);
        tvScreen.position.set(6, 6 + 20, -9.69);
        room.add(tvScreen);
        room.add(TV);
        
        //Tu
        const textureLoaderTu = new THREE.TextureLoader();
        const TuTexture = textureLoaderTu.load('public/textures/texture-stainless-metallic-sheet-textured.jpg');
        const Tumaterial = new THREE.MeshStandardMaterial({
            map: TuTexture,
        });

        const Tu = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 2.3), Tumaterial);
        Tu.position.set(6, 1 + 20, -9);
        Tu.castShadow = true;
        Tu.receiveShadow = true;
        room.add(Tu);

        // Tudung bên trái TV
        const TudungLeft = new THREE.Mesh(new THREE.BoxGeometry(2, 9, 0.3), Tumaterial);
        TudungLeft.position.set(1, 4.5 + 20, TV.position.z); 
        TudungLeft.castShadow = true;
        TudungLeft.receiveShadow = true;
        room.add(TudungLeft);
        objects.push(TudungLeft);

        // 2 cạnh cho TudungLeft
        const TudungLeftEdge1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 9, 3), Tumaterial); 
        TudungLeftEdge1.scale.z = 1.5; 
        TudungLeftEdge1.position.set(TudungLeft.position.x - 1, TudungLeft.position.y,-9.5); 
        TudungLeftEdge1.castShadow = true;
        TudungLeftEdge1.receiveShadow = true;
        room.add(TudungLeftEdge1);
        objects.push(TudungLeftEdge1);

        const TudungLeftEdge2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 9, 3), Tumaterial); 
        TudungLeftEdge2.scale.z = 1.5; 
        TudungLeftEdge2.position.set(TudungLeft.position.x + 1, TudungLeft.position.y, -9.5); 
        TudungLeftEdge2.castShadow = true;
        TudungLeftEdge2.receiveShadow = true;
        room.add(TudungLeftEdge2);
        objects.push(TudungLeftEdge2);

        //4 ngăn tủ cho TudungLeft
        for (let i = 0; i < 4; i++) { 
            const ngantuLeft = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 5), Tumaterial); 
            ngantuLeft.position.set(
                TudungLeft.position.x, 
                TudungLeft.position.y - 4.4 + i * 2.95, 
                TudungLeft.position.z
            );
            ngantuLeft.castShadow = true;
            ngantuLeft.receiveShadow = true;
            room.add(ngantuLeft);
            objects.push(ngantuLeft); 
        }
        //kính trais
        const glassLeft = new THREE.Mesh(new THREE.BoxGeometry(1.7, 9, 0.3), glassmaterial);
        glassLeft.position.set(1, 4.5 + 20, -7.5); 
        glassLeft.castShadow = true;
        glassLeft.receiveShadow = true;
        room.add(glassLeft);
        objects.push(glassLeft);


        // Tạo object Tudung bên phải TV
        const TudungRight = new THREE.Mesh(new THREE.BoxGeometry(2, 9, 0.3), Tumaterial);
        TudungRight.position.set(11, 4.5 + 20, TV.position.z); 
        TudungRight.castShadow = true;
        TudungRight.receiveShadow = true;
        room.add(TudungRight);
        objects.push(TudungRight);
        //kính phải 
        const glassRight = new THREE.Mesh(new THREE.BoxGeometry(1.7, 9, 0.3), glassmaterial);
        glassRight.position.set(11, 4.5 + 20, -7.5); 
        glassRight.castShadow = true;
        glassRight.receiveShadow = true;
        room.add(glassRight);
        objects.push(glassRight);

        // Thêm 2 cạnh cho TudungRight
        const TudungRightEdge1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 9, 4.5), Tumaterial); 
        TudungRightEdge1.position.set(TudungRight.position.x - 1, TudungRight.position.y, -9.5); 
        TudungRightEdge1.castShadow = true;
        TudungRightEdge1.receiveShadow = true;
        room.add(TudungRightEdge1);
        objects.push(TudungRightEdge1);

        const TudungRightEdge2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 9, 4.5), Tumaterial);
        TudungRightEdge2.position.set(TudungRight.position.x + 1, TudungRight.position.y, -9.5); 
        TudungRightEdge2.castShadow = true;
        TudungRightEdge2.receiveShadow = true;
        room.add(TudungRightEdge2);
        objects.push(TudungRightEdge2);

        // 4 ngăn tủ cho TudungRight
        for (let i = 0; i < 4; i++) { 
            const ngantuRight = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 5), Tumaterial); 
            ngantuRight.position.set(
                TudungRight.position.x, 
                TudungRight.position.y - 4.4 + i * 2.95, 
                TudungRight.position.z
            );
            ngantuRight.castShadow = true;
            ngantuRight.receiveShadow = true;
            room.add(ngantuRight);
            objects.push(ngantuRight); 
        }


        // Tạo ghế sofa
        const sofatextureLoader = new THREE.TextureLoader();
        const sofaTexture = sofatextureLoader.load('public/textures/preview.jpg');
        const sofaMaterial = new THREE.MeshStandardMaterial({ map: sofaTexture }); 

        // Texture cho đệm
        const cushionTexture = sofatextureLoader.load('public/textures/white-leather-texture.jpg');
        const cushionMaterial = new THREE.MeshStandardMaterial({ map: cushionTexture }); 
    
        cushionTexture.wrapS = THREE.RepeatWrapping;
        cushionTexture.wrapT = THREE.RepeatWrapping;
        cushionTexture.repeat.set(0.5, 0.5);


        // Thân ghế (phần ngồi)
        const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(6*2, 1*2, 3*2), sofaMaterial);
        sofaSeat.position.set(6, floor.position.y , 2+1+1); 
        sofaSeat.castShadow = true;
        sofaSeat.receiveShadow = true;
        room.add(sofaSeat);

        // Tựa lưng
        const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(6*2, 2*2, 0.5*2), sofaMaterial);
        sofaBack.position.set(6, floor.position.y + 2, 3.75+1+1+1.3); 
        sofaBack.castShadow = true;
        sofaBack.receiveShadow = true;
        room.add(sofaBack);

        // Tay vịn bên trái
        const sofaArmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.5*2, 2*2, 3*2), sofaMaterial);
        sofaArmLeft.position.set(3.25-3, floor.position.y + 1.5, 2+2.3); 
        sofaArmLeft.castShadow = true;
        sofaArmLeft.receiveShadow = true;
        room.add(sofaArmLeft);

        // Tay vịn bên phải
        const sofaArmRight = new THREE.Mesh(new THREE.BoxGeometry(0.5*2, 2*2, 3*2), sofaMaterial);
        sofaArmRight.position.set(8.75+3, floor.position.y + 1.5, 2+2.3); 
        sofaArmRight.castShadow = true;
        sofaArmRight.receiveShadow = true;
        room.add(sofaArmRight);

        // Đệm ghế
        const sofaCushion = new THREE.Mesh(new THREE.BoxGeometry(5.8*2, 0.5*2, 2.8*2), cushionMaterial);
        sofaCushion.position.set(6, floor.position.y + 1, 2+2); 
        sofaCushion.castShadow = true;
        sofaCushion.receiveShadow = true;
        room.add(sofaCushion);

    

        // Tạo bàn
        const tableMaterial = new THREE.MeshStandardMaterial({ color: '#EDEADE' }); 

        // Mặt kính của bàn
        const tableTop = new THREE.Mesh(new THREE.BoxGeometry(5*1.5, 0.2, 3*1.5), glassmaterial); 
        tableTop.position.set(6, floor.position.y + 1.2, -2); 
        tableTop.castShadow = true;
        tableTop.receiveShadow = true;
        room.add(tableTop);

        // Chân bàn 
        const legRadius = 0.1; 
        const legHeight = 1;

        // Chân bàn phía trước bên trái
        const tableLeg1 = new THREE.Mesh(new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 16), tableMaterial);
        tableLeg1.position.set(4.5-2, floor.position.y + 0.6, -3.4);
        tableLeg1.castShadow = true;
        tableLeg1.receiveShadow = true;
        room.add(tableLeg1);

        // Chân bàn phía trước bên phải
        const tableLeg2 = new THREE.Mesh(new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 16), tableMaterial);
        tableLeg2.position.set(7.5+2, floor.position.y + 0.6, -3.4);
        tableLeg2.castShadow = true;
        tableLeg2.receiveShadow = true;
        room.add(tableLeg2);

        // Chân bàn phía sau bên trái
        const tableLeg3 = new THREE.Mesh(new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 16), tableMaterial);
        tableLeg3.position.set(4.5-2, floor.position.y + 0.6, -0.6);
        tableLeg3.castShadow = true;
        tableLeg3.receiveShadow = true;
        room.add(tableLeg3);

        // Chân bàn phía sau bên phải
        const tableLeg4 = new THREE.Mesh(new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 16), tableMaterial);
        tableLeg4.position.set(7.5+2, floor.position.y + 0.6, -0.6);
        tableLeg4.castShadow = true;
        tableLeg4.receiveShadow = true;
        room.add(tableLeg4);

        //dong ho
        const textureLoadercircle = new THREE.TextureLoader();
        const clockTexture = textureLoadercircle.load('public/textures/clock_face_2_by_agf81_d2ssigh.jpg');
        
        const circleRadius = 1.5; 
        const circleThickness = 1;
        const circleGeometry = new THREE.CylinderGeometry(circleRadius, circleRadius, circleThickness, 64);
        const clockMaterial = new THREE.MeshStandardMaterial({map: clockTexture });
        const hangingclock = new THREE.Mesh(circleGeometry, clockMaterial);

        hangingclock.position.set(wallY.position.x - 4, 10 + 20, wallY.position.z);
        hangingclock.rotation.x = Math.PI / 2 ; 
        clockTexture.rotation = Math.PI / 2; 
        clockTexture.center.set(0.5, 0.5);  

        hangingclock.castShadow = true;
        hangingclock.receiveShadow = true;
        room.add(hangingclock);
        objects.push(hangingclock);

        //kimdongho
        
        const clockHandsGroup = new THREE.Group();
        clockHandsGroup.position.copy(hangingclock.position);
        clockHandsGroup.position.y += 0.01; 

    // Kim giờ
    const hourHand = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.7, 0.08),
        new THREE.MeshStandardMaterial({ color: '#222' })
    );
    hourHand.rotation.x = Math.PI / 2;
    hourHand.position.set(0, 0.55, 0); 
    hourHand.geometry.translate(0, 0.35, 0); 
    clockHandsGroup.add(hourHand);

    // Kim phút
    const minuteHand = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 1.1, 0.06),
        new THREE.MeshStandardMaterial({ color: '#444' })
    );
    minuteHand.rotation.x = Math.PI / 2;
    minuteHand.position.set(0, 0.55, 0);
    minuteHand.geometry.translate(0, 0.55, 0);
    clockHandsGroup.add(minuteHand);

    // Kim giây
    const secondHand = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 1.3, 0.04),
        new THREE.MeshStandardMaterial({ color: '#e74c3c' })
    );
    secondHand.rotation.x = Math.PI / 2; 
    secondHand.position.set(0, 0.55, 0);
    secondHand.geometry.translate(0, 0.65, 0);
    clockHandsGroup.add(secondHand);

    // group kim đồng hồ đúng hướng với hangingclock
    clockHandsGroup.rotation.x = Math.PI / 2;
    room.add(clockHandsGroup);

    // Animation cho kim đồng hồ
    function animateClockHands() {
        const now = new Date();
        const sec = now.getSeconds() + now.getMilliseconds() / 1000;
        const min = now.getMinutes() + sec / 60;
        const hour = now.getHours() % 12 + min / 60;

        hourHand.rotation.z = hour * Math.PI / 6;
        minuteHand.rotation.z = min * Math.PI / 30;
        secondHand.rotation.z = sec * Math.PI / 30;
    }

    // Máy nghe nhạc đĩa than
    const playerGroup = new THREE.Group();

    const textureLoaderdisk = new THREE.TextureLoader();
        const diskTexture = textureLoaderdisk.load('public/textures/x-los-angeles.png');
    // Thân máy 
    const playerBody = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 2),
        new THREE.MeshStandardMaterial({ color: '#222', metalness: 0.5, roughness: 0.7 })
    );
    playerBody.position.set(0, 0.25, 0);
    playerGroup.add(playerBody);

    // Đĩa than 
    const discGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.08, 64);
    const discMaterial = new THREE.MeshStandardMaterial({ map: diskTexture, metalness: 0.8, roughness: 0.3 });
    const disc = new THREE.Mesh(discGeometry, discMaterial);
    disc.position.set(0, 0.5, 0);
    disc.rotation.z = Math.PI ;
    playerGroup.add(disc);

    // Nhãn đĩa 
    const labelGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.09, 32);
    const labelMaterial = new THREE.MeshStandardMaterial({ color: '#c0392b' });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0.52, 0);
    label.rotation.x = Math.PI; 
    playerGroup.add(label);

    // Cần gạt 
    const armGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.9, 16);
    const armMaterial = new THREE.MeshStandardMaterial({ color: '#aaa' });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.set(0.45, 0.55, 0.35);
    arm.rotation.z = Math.PI / 4;
    arm.rotation.z = Math.PI / 2;
    playerGroup.add(arm);


    playerGroup.position.set(6, floor.position.y + 1.5, -2);
    room.add(playerGroup);
    objects.push(playerGroup);

return room;
}
