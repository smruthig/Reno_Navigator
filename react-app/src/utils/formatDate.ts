function formatDate(d:Date)
{
	let date="";
	date+=d.getDate().toString()+'/'
	date+=(d.getMonth()+1).toString()+'/'
	date+=d.getFullYear()
	return date;
}

export default formatDate