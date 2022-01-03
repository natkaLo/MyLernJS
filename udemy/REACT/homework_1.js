/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//переписать в новом формате
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

var employersNames = [];
for (var i = 0; i < employers.length; i++) {
	if (employers[i].length > 0 && employers[i].length != '') {
		employersNames.push(employers[i]);
	}
}
for (var i = 0; i < employersNames.length; i++) {
	employersNames[i] = employersNames[i].toLowerCase().trim();
}
//console.log(employersNames);

var sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};

function calcCash(own) {
    own = own || 0;
    var everyCash = Array.prototype.slice.call(arguments);
    //console.log(everyCash);
    var total = own;
    for (var i = 0; i < everyCash[1].length; i++) {
        total += +everyCash[1][i];
    }
    return total;
}

var money = calcCash(null, sponsors.cash);
//console.log(money);

function makeBusiness(owner, director, cash, emp) {
    director = director || 'Victor';
    var sumSponsors = sponsors.eu.concat(sponsors.rus, 'unexpected sponsor');
    console.log('We have a business. Owner: ' + owner + ', director: ' + director + '. Our budget: ' + cash + '. And our employers: ' +
    emp);
    console.log('And we have a sponsors: ');
    console.log.apply(null, sumSponsors);
    console.log('Note. Be careful with ' + sponsors.eu[0] + ". It's a huge risk.");
}
makeBusiness.apply(null, ['Sam', null, money, employersNames]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const employers1 = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

let employersNames1  = employers1.filter((name)=>{
    if(name.length >0 ){
        return name;
    }
});
employersNames1 = employersNames1.map(item => item.toLowerCase().trim());
//console.log(employersNames1);

const sponsors1 = {
    cash1: [40000, 5000, 30400, 12000],
    eu1: ['SRL', 'PLO', 'J&K'],
    rus1: ['RusAuto', 'SBO']
};


const money1 = sponsors1.cash1.reduce((sum,current)=>sum+current);
//console.log(money1);

function makeBusiness1(owner, cash, emp, director = 'Victor') {
     console.log(`We have a business. Owner: ${owner}, director: ${director}. Our budget: ${cash}. And our employers: ${emp}`);
     const sumSponsors1 = [...sponsors1.eu1,...sponsors1.rus1, 'unexpected sponsor'];
     console.log(`And we have a sponsors:\n${sumSponsors1}\nNote. Be careful with ${sumSponsors1[0]}. It's a huge risk.`);
}
makeBusiness1('Sam', money1, employersNames1);