import axios from 'axios'

const gunList = document.getElementById('gun-list')
const gunImg = document.getElementById('gun-img')
const gunName  = document.getElementById('gun-name')
const gunCost  = document.getElementById('gun-cost')
const gunStats  = document.getElementById('gun-stats')
const skinHolder  = document.getElementById('skin')
const gunSkins  = document.getElementById('skin-list')

// Check if there is a selected gun stored in local storage
const storedGun = localStorage.getItem('selectedGun')
if (storedGun) {
  const selectedGun = JSON.parse(storedGun)
  showGunInfo(selectedGun)
}

async function getGuns() {
  const data = await axios.get('https://valorant-api.com/v1/weapons')
  const valorant = data.data
  const guns = valorant.data // valorant guns

  guns.forEach(gun => {
    let gunIcon = document.createElement('img')
    const h3 = document.createElement('h3')
    const a = document.createElement('a')
    const li = document.createElement('li')

    console.log(gun)

    gunIcon.src = gun.shopData.newImage
    h3.innerText = gun.displayName
    a.innerText = gun.shopData.cost

    li.appendChild(gunIcon)
    li.appendChild(h3)
    li.appendChild(a)
    gunList.appendChild(li)

    li.addEventListener('click', () => {
      showGunInfo(gun)
      // Store the selected gun in local storage
      localStorage.setItem('selectedGun', JSON.stringify(gun))
    })
  })
};

function showGunInfo(gun) {
  gunImg.src = gun.displayIcon
  gunName.textContent = gun.displayName
  gunCost.textContent = `Cost: ${gun.shopData.cost}`
  gunStats.innerHTML = `<p>
    Fire rate: ${gun.weaponStats.fireRate} <br>
    Bullet Accuracy: ${gun.weaponStats.firstBulletAccuracy} <br>
    Magazine size: ${gun.weaponStats.magazineSize} <br>
    Reload time: ${gun.weaponStats.reloadTimeSeconds} <br>
    Run speed multiplier: ${gun.weaponStats.runSpeedMultiplier} <br>
  </p>
  <h3>Damage: </h3>
  <p> 
    Head damage: ${gun.weaponStats.damageRanges[0].headDamage} <br>
    Body damage: ${gun.weaponStats.damageRanges[0].bodyDamage} <br> 
    Leg damage: ${gun.weaponStats.damageRanges[0].legDamage} <br>
  </p>`

  const skin = gun.skins     
  skinHolder.innerHTML = "<h3>Skins: </h3>"
  gunSkins.innerHTML = " ";

  skin.forEach(weaponSkin =>{
    const skinList = document.createElement('h4')
    skinList.appendChild(document.createTextNode(weaponSkin.displayName))
    gunSkins.appendChild(skinList);
    console.log(weaponSkin.displayIcon)

    skinList.addEventListener('click', () => {
      gunImg.src = weaponSkin.displayIcon
    })
  })
}

getGuns()
