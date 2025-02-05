// fetch list of pdfs using github api
const getPDFList = async () => {
	const response = await fetch('https://api.github.com/repos/Aghast365/aghast365.github.io/contents/notes', {
		method: 'GET',
		headers: {
			'accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});
	const list = await response.json();
	return list;
}

let PDFListElement = document.getElementById('pdfs');
const refreshList = (e) => {
	PDFListElement.textContent = '';
	getPDFList().then((list) => {
		for (let i = 0; i < list.length; i++) {
			let PDFListItem = document.createElement('li');
			let PDFLink = document.createElement('a');
			PDFLink.href = `https://aghast365.github.io/notes/${list[i].name}`;
			PDFLink.textContent = list[i].name;
			PDFListItem.appendChild(PDFLink);
			PDFListElement.appendChild(PDFListItem);
		}
	});
}
refreshList(null);

let PDFRefreshElement = document.getElementById('refresh-pdfs');
PDFRefreshElement.addEventListener('click', refreshList);
/*
	TODO: make pdf list into a full widget with name/date/size information, e.g.
	Name v                                   | date modified |  size
	a.pdf                                    |  Feb 1 2026   |  26 KB

	Also incorporate a similar system into projects.html for sub-pages w/ javascript experiments
*/