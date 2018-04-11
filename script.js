let stateHandler = {
  set: (obj, prop, value) => {
    if (prop === 'page') {
    	switchState(value);
    }

    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  }
};

const switchState = (page) => {
	switch (page) {
		case 'home': 
			revertToHome();
			break;
		case 'music':
			switchPage('left', 'right', 'music');
			break;
		case 'compsci':
			switchPage('right', 'left', 'compsci');
			break;
	}
}

const revertToHome = () => {
	if (state.page === 'music' || state.page === 'compsci') {
		let [first, second] = state.page === 'music' ? ['left', 'right'] : ['right', 'left'];
		let active = document.getElementById('box-' + first);
		let passive = document.getElementById('box-' + second);
		let activeTri = document.getElementById('triangle-bottom' + first);
		let passiveTri = document.getElementById('triangle-bottom' + second);
		activeTri.style.top = '10vh';
		activeTri.style[first === 'left' ? 'borderBottom' : 'borderTop'] = first === 'left' ? (window.innerWidth > 700 ? '80vh solid #17A17E' : '90vh solid #17A17E') : (window.innerWidth > 700 ? '80vh solid #0F69B8' : '90vh solid #0F69B8' );
		contract(first);
		document.getElementById('home-link').style.display = 'none';
		console.log(state.page);
		document.getElementById(`${state.page}-icon`).style.opacity = '1.0';
		document.getElementById(`${state.page}-page`).style.opacity = '0.0';

		let value = 90;

		let timer = setInterval(() => {
			// console.log('reverting');
			activeTri.style[first] = `${value + (window.innerWidth > 700 ? 10 : 0)}vw`;
			active.style.width = `${value}vw`;
			if (value === (window.innerWidth > 700 ? 35 : 45)) {
				console.log('done');
				addListeners();
				passive.style.zIndex = 'auto';
				passiveTri.style.zIndex = 'auto';
				if(window.innerWidth < 700) {
					let links = document.getElementsByClassName('corner-link');
					for(let i = 0; i < links.length; i++ ) {
						links[i].style.display = 'block';
					}
				}
				document.getElementById('music-page').style.display = 'none';
				document.getElementById('compsci-page').style.display = 'none';

				// document.getElementById(`${state.page}-icon`).style.display = 'block';
				clearInterval(timer);
				return;
			}
			else {
				value-=5;
			}
		}, 5)
	}
	else if (state.page === 'home'){
		console.log('redundant');
	}
	else {
		console.log('adding listeners');
		addListeners();
	}
} 

const switchPage = (first, second, page) => {
	let active = document.getElementById('box-' + first); 
	let passive = document.getElementById('box-' + second); 
	let activeTri = document.getElementById('triangle-bottom' + first); 
	let passiveTri = document.getElementById('triangle-bottom' + second); 
	let value = window.innerWidth < 700 ? 45 : 35;
	document.getElementById(`${page}-icon`).style.opacity = '0.0';
	document.getElementById(`${page}-page`).style.opacity = '1.0';

	// console.log(page);
	// console.dir(active); 
	// console.dir(passive); 
	// console.dir(page); 
	// console.dir(active.style); 
	passive.style.zIndex = '-1'; 
	passiveTri.style.zIndex = '-1'; 
	document.getElementById('box-left').removeEventListener('click', toMusic);
	document.getElementById('box-right').removeEventListener('click', toCompSci);
	document.getElementById('box-left').removeEventListener('mouseover', pulseInLeft); 
	document.getElementById('box-left').removeEventListener('mouseleave', pulseOutLeft); 
	document.getElementById('box-right').removeEventListener('mouseover', pulseInRight); 
	document.getElementById('box-right').removeEventListener('mouseleave', pulseOutRight);

	let timer = setInterval(() => {
		activeTri.style[first] = `${value + (window.innerWidth < 700 ? 0 : 10)}vw`;
		active.style.width = `${value}vw`;
		if (value === 90) {
			if(window.innerWidth < 700) {
				let links = document.getElementsByClassName('corner-link');
				for(let i = 0; i < links.length; i++ ) {
					links[i].style.display = 'none';
				}
			}
			expand(first);
			activeTri.style.top = '0';
			activeTri.style[first === 'left' ? 'borderBottom' : 'borderTop'] = first === 'left' ? '100vh solid #17A17E' : '100vh solid #0F69B8';
			document.getElementById('home-link').style.display = 'block';
			document.getElementById(`${page}-page`).style.display = 'block';
			// document.getElementById(`${page}-icon`).style.display = 'none';
			clearInterval(timer);
			return;
		}
		else {
			value+=5;
		}
	}, 5)
}
const pulseIn = (active) => {
	document.getElementById('box-' + active).style.height = '90vh';
	document.getElementById('box-' + active).style.top = '5vh';
	document.getElementById('triangle-bottom' + active).style.top = '5vh';
	document.getElementById('triangle-bottom' + active).style[active === 'left' ? 'borderBottom' : 'borderTop'] = active === 'left' ? '90vh solid #17A17E' : '90vh solid #0F69B8';
}

const pulseOut = (active) => {
	document.getElementById('box-' + active).style.height = '80vh';
	document.getElementById('box-' + active).style.top = '10vh';
	document.getElementById('triangle-bottom' + active).style.top = '10vh';
	document.getElementById('triangle-bottom' + active).style[active === 'left' ? 'borderBottom' : 'borderTop'] = active === 'left' ? '80vh solid #17A17E' : '80vh solid #0F69B8';

}

const expand = (active) => {
	// document.getElementById('triangle-bottom' + active).style.transition = `top 0.1s, ${active === 'left' ? 'borderBottom' : 'borderTop'} 0.1s, ${active} 0.1s, `;
	document.getElementById('box-' + active).style.transition = `height 0.1s, top 0.1s, width 0.1s, ${active} 0.1s`;
	document.getElementById('box-' + active).style.height = '100vh';
	document.getElementById('box-' + active).style.top = '0';
	document.getElementById('box-' + active).style.width = '100vw';
	document.getElementById('box-' + active).style[active] = '0';

}

const contract = (active) => {
	console.log('contracting');
	if(window.innerWidth > 700) {
		document.getElementById('box-' + active).style.height = '80vh';
		document.getElementById('box-' + active).style.top = '10vh';
		document.getElementById('box-' + active).style.width = '90vw';
		document.getElementById('box-' + active).style[active] = '10vw';
	}
	else {
		document.getElementById('box-' + active).style.height = '90vh';
		document.getElementById('box-' + active).style.top = '10vh';
		document.getElementById('box-' + active).style.width = '100vw';
		document.getElementById('box-' + active).style[active] = '0';
	}
	document.getElementById('box-' + active).style.transition = 'height 1s, top 1s';
}

let state = new Proxy({}, stateHandler);

const pulseInLeft = () => {
	if(window.innerWidth > 700) {
		pulseIn('left');
	}
}

const pulseOutLeft = () => {
	if(window.innerWidth > 700) {
		pulseOut('left');
	}
}

const pulseInRight = () => {
	if(window.innerWidth > 700) {	
		pulseIn('right');
	}
}

const pulseOutRight = () => {
	if(window.innerWidth > 700) {
		pulseOut('right');
	}
}

const toMusic = () => {
	state.page = 'music';
}

const toCompSci = () => {
	state.page = 'compsci';
}

const toHome = () => {
	state.page = 'home';
}

const addListeners = () => {
	document.getElementById('box-left').addEventListener('click', toMusic);
	document.getElementById('box-right').addEventListener('click', toCompSci);
	document.getElementById('box-left').addEventListener('mouseover', pulseInLeft); 
	document.getElementById('box-left').addEventListener('mouseleave', pulseOutLeft); 
	document.getElementById('box-right').addEventListener('mouseover', pulseInRight); 
	document.getElementById('box-right').addEventListener('mouseleave', pulseOutRight); 
}

state.page = 'home';
document.getElementById('home-link').addEventListener('click', toHome);
setTimeout(() => {
	document.getElementById('cover').style.opacity = '0.0';
}, 1000);
const intro = setInterval(() => {
	if(window.getComputedStyle(document.getElementById('cover')).opacity == '0'){
		document.getElementById('cover').style.display = 'none';
		clearInterval(intro);
	}
})

