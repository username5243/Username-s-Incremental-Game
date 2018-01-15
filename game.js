var game = {
	coins:new Decimal(1),
	incomes:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
	costs:[new Decimal(1),new Decimal(100),new Decimal(1e4),new Decimal(1e7),new Decimal(1e10),new Decimal(1e14),new Decimal(1e18),new Decimal(1e23)],
	costmult:[2,3,4,6,10,15,25,40],
	amounts:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
	multipliers:[new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)],
	progress:[0,0,0,0,0,0,0,0],
	totalCoins:new Decimal(0),
	prestigeCount:0,
	boost:new Decimal(1),
	notation:0,
	time:new Date().getTime(),
	upgradeCoins:new Decimal(0),
	upgrades:[],
	achievements:[]
}
function abbreviate(i) {
	if(i==0) return "K";
	if(i==1) return "M";
	if(i==2) return "B";
	var units = ["","U","Du","T","Q","Qi","S","Sp","O","N"]
	var tens = ["","D","V","Tg","Qg","Qig","Sg","SPg","Og","Ng"]
	var hundreds = ["","C","Dc","Tc","Qc","Qic","Sc","Spc","Oc","Nc"]
	var i2=Math.floor(i/10);
	var i3=Math.floor(i2/10);
	var unit = units[i%10];
	var ten = tens[i2%10];
	var hundred = hundreds[i3%10];
	return unit+ten+hundred;
}
function displayTime(s) {
	if (s < 10) return format(s*1000) + " milliseconds."
	if (s < 60) return format(s) + " seconds."
	if (s < 3600) return Math.floor(s/60) + " minutes, " + format(s%60) + " seconds."
	return Math.floor(s/3600) + " hours, " + Math.floor((s/60)%60) + " minutes, " + format(s%60) + " seconds."
}
function format(a) {
	a = new Decimal(a)
	if (a.lte(9999.5)) return a.toFixed(3)
	if (game.notation==1) return a.toExponential(3).replace("e+","e")
	if (game.notation==3) return "e"+Math.round(1000*a.log10())/1000;
	var m = a.mantissaWithDecimalPlaces(3)
	var e = a.e;
	if (m>9.9995) {
		m = 1;
		e++;
	}
	var exponent2 = 3*Math.floor(e/3);
	var mantissa2 = Math.round(1000*m*Math.pow(10,e-exponent2))/1000;
	if(game.notation==0) return mantissa2+abbreviate(exponent2/3-1)
	if(game.notation==2) return mantissa2+"e"+exponent2
}
function update(set,get){
	document.getElementById(set).innerHTML=get
}
function showElement(elementID) {
	document.getElementById(elementID).style.display="inline-block"
}
function hideElement(elementID) {
	document.getElementById(elementID).style.display="none"
}
function getAch(ach) {
	if (game.achievements.includes(ach)) return false;
	game.achievements.push(ach)
}
function getprestige() {
	var product = new Decimal(0.01);
	for(var i=0;i<=7;i++) product = product.mul(game.amounts[i].pow(0.025))
	return product
}
function getUC() {
	return game.coins.div(1e63).pow(0.03).floor()
}
function prestige() {
	game = {
		coins:new Decimal(1),
		incomes:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
		costs:[new Decimal(1),new Decimal(100),new Decimal(1e4),new Decimal(1e7),new Decimal(1e10),new Decimal(1e14),new Decimal(1e18),new Decimal(1e23)],
		costmult:[2,3,4,6,10,15,25,40],
		amounts:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
		multipliers:[getprestige(),getprestige(),getprestige(),getprestige(),getprestige(),getprestige(),getprestige(),getprestige()],
		progress:[0,0,0,0,0,0,0,0],
		prestigecount:game.prestigecount+1,
		boost:getprestige(),
		notation:game.notation,
		time:game.time,
		timePlayed:game.timePlayed,
		totalCoins:game.totalCoins,
		upgradeCoins:game.upgradeCoins,
		upgrades:game.upgrades,
		achievements:game.achievements
	}
	showElement("prestigeInfo")
	update("prestigeBoost",format(game.boost))
	hideElement("prestigeButton")
}
function upgrade() {
	game = {
		coins:new Decimal(1),
		incomes:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
		costs:[new Decimal(1),new Decimal(100),new Decimal(1e4),new Decimal(1e7),new Decimal(1e10),new Decimal(1e14),new Decimal(1e18),new Decimal(1e23)],
		costmult:[2,3,4,6,10,15,25,40],
		amounts:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
		multipliers:[new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)],
		progress:[0,0,0,0,0,0,0,0],
		prestigeCount:0,
		boost:new Decimal(1),
		notation:game.notation,
		time:game.time,
		timePlayed:game.timePlayed,
		totalCoins:game.totalCoins,
		upgradeCoins:game.upgradeCoins.add(getUC()),
		upgrades:game.upgrades,
		achievements:game.achievements
	}
	hideElement("UCButton")
}
function hardReset() {
	if(confirm("Are you sure you want to hard reset? This will erase all your progress.")) {
		game = {
			coins:new Decimal(1),
			incomes:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
			costs:[new Decimal(1),new Decimal(100),new Decimal(1e4),new Decimal(1e7),new Decimal(1e10),new Decimal(1e14),new Decimal(1e18),new Decimal(1e23)],
			costmult:[2,3,4,6,10,15,25,40],
			amounts:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
			multipliers:[new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)],
			progress:[0,0,0,0,0,0,0,0],
			totalCoins:new Decimal(0),
			prestigeCount:0,
			boost:new Decimal(1),
			notation:0,
			time:new Date().getTime(),
			upgradeCoins:new Decimal(0),
			upgrades:[],
			achievements:[]
		}
	hideElement("prestigeInfo")
	hideElement("UCButton")
	}
}
function buy(n) {
	if(n==1) {
		if(game.costs[0].gt(game.coins)) return 0;
		game.coins = game.coins.sub(game.costs[0]);
		game.amounts[0] = game.amounts[0].add(1);
		game.costs[0]=game.costs[0].mul(game.costmult[0]);
		game.progress[0]++;
		game.incomes[0] = game.incomes[0].add(game.multipliers[0]);
		if(game.progress[0]==8) {
			game.multipliers[0] = game.multipliers[0].mul(1.5);
			game.incomes[0] = game.incomes[0].mul(1.5);
			game.progress[0]=0;
		}
		update("coinbox",format(game.coins));
		update("incomebox",format(game.incomes[0]));
		update("c1",format(game.costs[0]));
		update("a1",format(game.amounts[0]));
		update("m1",format(game.multipliers[0]));
		update("p1",game.progress[0]);
	}else{
		if(game.costs[n-1].gt(game.coins)) return 0;
		game.coins = game.coins.sub(game.costs[n-1]);
		game.amounts[n-1] = game.amounts[n-1].add(1);
		game.costs[n-1]= game.costs[n-1].mul(game.costmult[n-1]);
		game.progress[n-1]++;
		game.incomes[n-1] = game.incomes[n-1].add(game.multipliers[n-1]);
		if(game.progress[n-1]==8) {
			game.multipliers[n-1] = game.multipliers[n-1].mul(1.5);
			game.progress[n-1]=0;
			game.incomes[n-1] = game.incomes[n-1].mul(1.5);
		}
		update("coinbox",format(game.coins));
		update("i"+(n-1),format(game.incomes[n-1]));
		update("c"+n,format(game.costs[n-1]));
		update("a"+n,format(game.amounts[n-1]));
		update("m"+n,format(game.multipliers[n-1]));
		update("p"+n,game.progress[n-1]);
		update("notationID",game.notation)
	}
}
function step() {
	const s = (new Date().getTime()-game.time)/1000
	game.time = new Date().getTime()
	game.timePlayed+=s;
	for(let i=7;i>=1;i--) game.amounts[i-1] = game.amounts[i-1].add(game.incomes[i].mul(s));
 	game.coins = game.coins.add(game.incomes[0].mul(s));
	game.totalCoins = game.totalCoins.add(game.incomes[0].mul(s))
	for(let i=1;i<=8;i++) game.incomes[i-1] = game.amounts[i-1].mul(game.multipliers[i-1]);
	update("coinbox",format(game.coins));
	update("incomebox",format(game.incomes[0]));
	for(let i=1;i<=8;i++) {
		update("a"+i,format(game.amounts[i-1]));
		update("c"+i,format(game.costs[i-1]));
		update("m"+i,format(game.multipliers[i-1]));
		update("p"+i,game.progress[i-1]);
	}
	for(let i=1;i<=7;i++) update("i"+i,format(game.incomes[i]));
	update("totalCoinDisplay",format(game.totalCoins));
	update("playTime",displayTime(game.timePlayed));
	update("prestigeTimes",game.prestigecount);
	getprestige()
	update("prestmult",format(getprestige().div(game.boost)))
	if(game.boost.gt(1)) showElement("prestigeInfo");
	update("prestigeBoost",format(game.boost));
	if(getprestige().div(game.boost).gte(1)) document.getElementById("prestigeButton").style.display = "inline-block";
	if(game.coins.gte(1e63)) showElement("UCButton");
	update("UCAmount",getUC());
}
function switchNotation() {
	var notationArray = ["Standard","Scientific","Engineering","Logarithm"]
	game.notation++;
	if(game.notation>notationArray.length-1) game.notation=0;
	update("notationID",notationArray[game.notation]);
}
function save() {
	localStorage.setItem('save',btoa(JSON.stringify(game)))
}
function load(save) {
	game=JSON.parse(atob(save))
	
	if (game.notations===undefined) game.notations=0
	if (game.time===undefined) game.time=new Date().getTime();
	if (game.timePlayed===undefined) game.timePlayed=0;
	if (game.upgradeCoins===undefined) game.upgradeCoins=new Decimal(0)
	else game.upgradeCoins = new Decimal(game.upgradeCoins)
	if (game.upgrades===undefined) game.upgrades=[]
	if (game.achievements===undefined) game.achievements=[];
	
	for(let i=0;i<=7;i++) {
		game.multipliers[i] = new Decimal(game.multipliers[i])
		game.amounts[i] = new Decimal(game.amounts[i])
		game.costs[i] = new Decimal(game.costs[i])
		game.incomes[i] = new Decimal(game.incomes[i]);
	}
	game.coins = new Decimal(game.coins)
	game.totalCoins = new Decimal(game.totalCoins)
	game.boost = new Decimal(game.boost)
	
	update("coinbox",format(game.coins));
	update("incomebox",format(game.incomes[0]));
	for(let i=1;i<=8;i++) {
		update("a"+i,format(game.amounts[i-1]));
		update("c"+i,format(game.costs[i-1]));
		update("m"+i,format(game.multipliers[i-1]));
		update("p"+i,format(game.progress[i-1]));
	}
	for(let i=1;i<=7;i++) update("i"+i,format(game.incomes[i]));
	update("prestmult",getprestige())
}
function exportGame() {
	var savefile=btoa(JSON.stringify(game))
	showElement("exportInfo")
	document.getElementById("exportSave").value=btoa(JSON.stringify(game))
}	
function importGame() {
	var input=prompt('Paste in your exported save and press enter.')
	load(input)
}
function init() {
	if(localStorage.getItem('save')!=null) load(localStorage.getItem('save'));
	setInterval(step,100)
	setInterval(save,10000)
}
var tab="generators"
function switchTab(tabName) {
	hideElement(tab)
	showElement(tabName)
	tab=tabName
}