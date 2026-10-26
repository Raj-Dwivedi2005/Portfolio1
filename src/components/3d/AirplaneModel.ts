import * as THREE from "three";

/**
 * Creates an exquisite, procedural modern widebody twin-engine commercial airliner.
 * Unbranded, sleek, aerodynamic, and completely original.
 */
export function createAirlinerModel(): {
  airplaneGroup: THREE.Group;
  leftEngineNozzle: THREE.Vector3;
  rightEngineNozzle: THREE.Vector3;
  navLights: { light: THREE.PointLight; mesh: THREE.Mesh; baseIntensity: number }[];
  turbines: THREE.Mesh[];
} {
  const airplaneGroup = new THREE.Group();

  // Materials
  // Premium fuselage composite material: pearlescent metallic white with subtle cyan sheen
  const fuselageMaterial = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.35,
    roughness: 0.25,
    envMapIntensity: 1.2,
  });

  const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.4,
    roughness: 0.3,
  });

  const leadingEdgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.8,
    roughness: 0.15,
  });

  const cockpitGlassMaterial = new THREE.MeshStandardMaterial({
    color: 0x082f49,
    metalness: 0.95,
    roughness: 0.05,
    transparent: true,
    opacity: 0.88,
  });

  const engineNacelleMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.7,
    roughness: 0.2,
  });

  const engineExhaustMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.85,
  });

  const fanBladeMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.2,
  });

  // 1. FUSELAGE (Modern twin-aisle widebody profile)
  // Main cabin cylinder
  const cabinGeom = new THREE.CylinderGeometry(0.38, 0.38, 3.4, 32);
  cabinGeom.rotateX(Math.PI / 2);
  const cabin = new THREE.Mesh(cabinGeom, fuselageMaterial);
  cabin.castShadow = true;
  airplaneGroup.add(cabin);

  // Nose cone (aerodynamic smooth taper)
  const noseGeom = new THREE.ConeGeometry(0.38, 1.3, 32);
  noseGeom.rotateX(Math.PI / 2);
  const nose = new THREE.Mesh(noseGeom, fuselageMaterial);
  nose.position.z = 1.7 + 0.65;
  airplaneGroup.add(nose);

  // Tail cone (smooth upward taper to APU exhaust)
  const tailConeGeom = new THREE.ConeGeometry(0.38, 1.8, 32);
  tailConeGeom.rotateX(-Math.PI / 2);
  const tailCone = new THREE.Mesh(tailConeGeom, fuselageMaterial);
  tailCone.position.z = -1.7 - 0.9;
  tailCone.position.y = 0.06;
  airplaneGroup.add(tailCone);

  // Cockpit windshield visor (curved sleek glass wrap)
  const cockpitGeom = new THREE.BoxGeometry(0.44, 0.18, 0.55);
  const cockpit = new THREE.Mesh(cockpitGeom, cockpitGlassMaterial);
  cockpit.position.set(0, 0.22, 1.85);
  cockpit.rotation.x = -Math.PI / 10;
  airplaneGroup.add(cockpit);

  // Cabin window stripes (subtle decorative livery hairline)
  const windowStripGeom = new THREE.BoxGeometry(0.78, 0.04, 2.6);
  const windowStripMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
  const windowStrip = new THREE.Mesh(windowStripGeom, windowStripMat);
  windowStrip.position.set(0, 0.1, 0.1);
  airplaneGroup.add(windowStrip);

  // 2. MAIN WINGS (Swept back with dihedral and raked winglets)
  const wingShape = new THREE.Shape();
  // Root chord to tip chord
  wingShape.moveTo(0, 0);
  wingShape.lineTo(0.5, 0); // Root width
  wingShape.lineTo(0.18, 2.7); // Tip sweep
  wingShape.lineTo(-0.06, 2.7); // Tip chord
  wingShape.lineTo(-0.4, 0); // Trailing edge root
  wingShape.closePath();

  const extrudeSettings = {
    steps: 1,
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  };

  const wingGeom = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);

  // Right wing
  const rightWing = new THREE.Mesh(wingGeom, wingMaterial);
  rightWing.rotation.x = Math.PI / 2;
  rightWing.rotation.y = -0.18; // Dihedral angle
  rightWing.rotation.z = -Math.PI / 2 - 0.32; // Sweep back
  rightWing.position.set(0.25, -0.05, 0.2);
  airplaneGroup.add(rightWing);

  // Left wing
  const leftWing = new THREE.Mesh(wingGeom, wingMaterial);
  leftWing.rotation.x = Math.PI / 2;
  leftWing.rotation.y = 0.18; // Dihedral angle
  leftWing.rotation.z = Math.PI / 2 + 0.32; // Sweep back
  leftWing.position.set(-0.25, -0.05, 0.2);
  airplaneGroup.add(leftWing);

  // Leading edge chrome slats
  const slatGeom = new THREE.CylinderGeometry(0.03, 0.03, 2.8, 16);
  const rightSlat = new THREE.Mesh(slatGeom, leadingEdgeMaterial);
  rightSlat.rotation.z = -Math.PI / 2.7;
  rightSlat.position.set(1.4, 0.08, 0.32);
  airplaneGroup.add(rightSlat);

  const leftSlat = new THREE.Mesh(slatGeom, leadingEdgeMaterial);
  leftSlat.rotation.z = Math.PI / 2.7;
  leftSlat.position.set(-1.4, 0.08, 0.32);
  airplaneGroup.add(leftSlat);

  // Winglets (blended upturned aerodynamic tips)
  const wingletGeom = new THREE.BoxGeometry(0.04, 0.38, 0.24);
  const rightWinglet = new THREE.Mesh(wingletGeom, fuselageMaterial);
  rightWinglet.position.set(2.48, 0.32, -0.7);
  rightWinglet.rotation.z = -0.3;
  airplaneGroup.add(rightWinglet);

  const leftWinglet = new THREE.Mesh(wingletGeom, fuselageMaterial);
  leftWinglet.position.set(-2.48, 0.32, -0.7);
  leftWinglet.rotation.z = 0.3;
  airplaneGroup.add(leftWinglet);

  // 3. ENGINES (Twin High-Bypass Turbofans under wings)
  const turbines: THREE.Mesh[] = [];

  const createEngine = (isRight: boolean) => {
    const engineGroup = new THREE.Group();
    const xPos = isRight ? 1.05 : -1.05;

    // Pylon strut connecting wing to engine
    const pylonGeom = new THREE.BoxGeometry(0.06, 0.22, 0.65);
    const pylon = new THREE.Mesh(pylonGeom, wingMaterial);
    pylon.position.set(0, 0.18, 0.1);
    pylon.rotation.x = 0.1;
    engineGroup.add(pylon);

    // Engine Nacelle outer cowling
    const nacelleGeom = new THREE.CylinderGeometry(0.24, 0.23, 1.1, 24);
    nacelleGeom.rotateX(Math.PI / 2);
    const nacelle = new THREE.Mesh(nacelleGeom, engineNacelleMaterial);
    engineGroup.add(nacelle);

    // Chrome intake lip
    const intakeLipGeom = new THREE.TorusGeometry(0.23, 0.03, 16, 32);
    const intakeLip = new THREE.Mesh(intakeLipGeom, leadingEdgeMaterial);
    intakeLip.position.z = 0.55;
    engineGroup.add(intakeLip);

    // Turbine spinner cone & fan blades
    const spinnerGeom = new THREE.ConeGeometry(0.08, 0.22, 16);
    spinnerGeom.rotateX(Math.PI / 2);
    const spinner = new THREE.Mesh(spinnerGeom, fanBladeMaterial);
    spinner.position.z = 0.45;
    turbines.push(spinner);
    engineGroup.add(spinner);

    // Glowing exhaust core
    const exhaustGeom = new THREE.CylinderGeometry(0.14, 0.18, 0.2, 20);
    exhaustGeom.rotateX(Math.PI / 2);
    const exhaust = new THREE.Mesh(exhaustGeom, engineExhaustMaterial);
    exhaust.position.z = -0.55;
    engineGroup.add(exhaust);

    // Subtle engine glow light
    const engineGlow = new THREE.PointLight(0x00f0ff, 0.6, 2.5);
    engineGlow.position.set(0, 0, -0.65);
    engineGroup.add(engineGlow);

    engineGroup.position.set(xPos, -0.32, 0.35);
    return { engineGroup, exhaustPosition: new THREE.Vector3(xPos, -0.32, -0.2) };
  };

  const rightEng = createEngine(true);
  const leftEng = createEngine(false);
  airplaneGroup.add(rightEng.engineGroup);
  airplaneGroup.add(leftEng.engineGroup);

  // 4. TAIL ASSEMBLY (Empennage)
  // Vertical Stabilizer (Fin)
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(0.95, 0); // Root
  finShape.lineTo(0.35, 1.3); // Top tip swept back
  finShape.lineTo(0.05, 1.3); // Top chord
  finShape.closePath();

  const finGeom = new THREE.ExtrudeGeometry(finShape, extrudeSettings);
  const fin = new THREE.Mesh(finGeom, fuselageMaterial);
  fin.position.set(0.03, 0.25, -2.4);
  fin.rotation.y = Math.PI / 2;
  airplaneGroup.add(fin);

  // Horizontal Stabilizers (Tail planes)
  const hStabShape = new THREE.Shape();
  hStabShape.moveTo(0, 0);
  hStabShape.lineTo(0.4, 0);
  hStabShape.lineTo(0.15, 1.05);
  hStabShape.lineTo(-0.05, 1.05);
  hStabShape.closePath();

  const hStabGeom = new THREE.ExtrudeGeometry(hStabShape, extrudeSettings);

  const rightHStab = new THREE.Mesh(hStabGeom, wingMaterial);
  rightHStab.rotation.x = Math.PI / 2;
  rightHStab.rotation.y = -0.1;
  rightHStab.rotation.z = -Math.PI / 2 - 0.45;
  rightHStab.position.set(0.12, 0.22, -2.1);
  airplaneGroup.add(rightHStab);

  const leftHStab = new THREE.Mesh(hStabGeom, wingMaterial);
  leftHStab.rotation.x = Math.PI / 2;
  leftHStab.rotation.y = 0.1;
  leftHStab.rotation.z = Math.PI / 2 + 0.45;
  leftHStab.position.set(-0.12, 0.22, -2.1);
  airplaneGroup.add(leftHStab);

  // 5. NAVIGATION LIGHTS (Aviation Standard: Red Port, Green Starboard, White Tail Strobe)
  const navLights: { light: THREE.PointLight; mesh: THREE.Mesh; baseIntensity: number }[] = [];

  // Red light on Left wingtip
  const redLight = new THREE.PointLight(0xff1f1f, 1.5, 3.5);
  redLight.position.set(-2.5, 0.35, -0.7);
  const redBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xff1f1f })
  );
  redBulb.position.copy(redLight.position);
  airplaneGroup.add(redLight);
  airplaneGroup.add(redBulb);
  navLights.push({ light: redLight, mesh: redBulb, baseIntensity: 1.5 });

  // Green light on Right wingtip
  const greenLight = new THREE.PointLight(0x00ff88, 1.5, 3.5);
  greenLight.position.set(2.5, 0.35, -0.7);
  const greenBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x00ff88 })
  );
  greenBulb.position.copy(greenLight.position);
  airplaneGroup.add(greenLight);
  airplaneGroup.add(greenBulb);
  navLights.push({ light: greenLight, mesh: greenBulb, baseIntensity: 1.5 });

  // White strobe light on top of tail fin
  const whiteStrobe = new THREE.PointLight(0xffffff, 2.0, 4.0);
  whiteStrobe.position.set(0, 1.58, -2.3);
  const whiteBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  whiteBulb.position.copy(whiteStrobe.position);
  airplaneGroup.add(whiteStrobe);
  airplaneGroup.add(whiteBulb);
  navLights.push({ light: whiteStrobe, mesh: whiteBulb, baseIntensity: 2.0 });

  // Scale model appropriately to fit viewport
  airplaneGroup.scale.set(0.72, 0.72, 0.72);

  return {
    airplaneGroup,
    leftEngineNozzle: leftEng.exhaustPosition,
    rightEngineNozzle: rightEng.exhaustPosition,
    navLights,
    turbines,
  };
}
