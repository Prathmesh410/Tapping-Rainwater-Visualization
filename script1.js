const blocksContainer = document.getElementById("blocks")
const heightsInput = document.getElementById('heights-input');
const form = document.getElementById('heights-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  emptyBlocks()
  const heights = heightsInput.value.split(',').map(x => parseInt(x));
//   console.log(heights);
  const waterBlocks = calculateTotalWater(heights);
  const water = trappingWater(heights);
  generateBlocks(heights);
  updateResult(waterBlocks);
  generateWaterBlocks(heights,water);
  
});

function emptyBlocks(){
    document.getElementById("blocks").innerHTML = "";
    document.getElementById("water_blocks").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}

function generateBlocks(heights) {
    console.log(heights);
    heights.forEach(height => {
    const block = document.createElement("div");
    block.style.height = `${height* 30}px`;
    block.classList.add('block');
    const element = document.getElementById("blocks");
    element.appendChild(block);
    });
  }

function generateWaterBlocks(heights,water) {
    const len = heights.length;
    for (let i = 0; i < len; i++) {
        const resultBlock = document.createElement("div");
        resultBlock.style.display = 'flex';
        resultBlock.style.flexDirection = 'column-reverse';
        resultBlock.classList.add('resultblock');


        const b = document.createElement("div");
        b.style.height =   `${heights[i] *30}px`;
        b.classList.add('waterb');
        
        const w = document.createElement("div");
        w.style.height = `${water[i] * 30}px`;
        w.classList.add('waterw');

        resultBlock.appendChild(b);
        resultBlock.appendChild(w);
        const element = document.getElementById("water_blocks");
        element.appendChild(resultBlock);
      }
  }

  function calculateTotalWater(heights) {
    
    let left = 0;
    let right = heights.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let waterBlocks = 0;
  
    while (left < right) {
      if (heights[left] > leftMax) {
        leftMax = heights[left];
      }
      if (heights[right] > rightMax) {
        rightMax = heights[right];
      }
      if (leftMax >= rightMax) {
        waterBlocks += rightMax - heights[right];
        right--;
      } else {
        waterBlocks += leftMax - heights[left];
        left++;
      }
    }
  
    return waterBlocks;
  }

  function trappingWater(height) {
    const n = height.length;
    let lmax = height[0];
    let rmax = height[n - 1];
    const l = new Array(n).fill(0);
    const r = new Array(n).fill(0);
    const water = new Array(n).fill(0);
    
    for (let i = 1; i < n; i++) {
      lmax = Math.max(lmax, height[i]);
      l[i] = lmax;
    }
    
    for (let i = n - 2; i >= 0; i--) {
      rmax = Math.max(rmax, height[i]);
      r[i] = rmax;
    }
    
    for (let i = 1; i < n - 1; i++) {
      water[i] = Math.max(Math.min(l[i], r[i]) - height[i], 0);
    }
    
    return water;
  }
  
  
  
function updateResult(waterBlocks) {
const para = document.createElement("p");
const node = document.createTextNode(`Total Units of water stored: ${waterBlocks}`);
para.appendChild(node);

const element = document.getElementById("result");
element.appendChild(para);
  }


//   const waterBlocks = calculateTotalWater(heights);
//   const water = trappingWater(heights);
//   console.log(water);
//   generateBlocks(heights);
//   updateResult(waterBlocks);
//   generateWaterBlocks(heights,water);
//   console.log(waterBlocks);