export function getColumnsFromArray(array) {
    
    let columns = [];
    array.forEach((colName) => {
        let accessor = (colName.charAt(0).toLowerCase(0) + colName.slice(1)).replace(' ', '');
        let column = {Header: colName, accessor: accessor};
        columns.push(column)
    })

    return columns;
}

export function shrinkToHtmlNames(namesArray) {  

    let namesHtmlArray = [];
    namesArray.forEach((name) => {
        namesHtmlArray.push((name.replace(' ', '')).toLowerCase());
    })
    
    return namesHtmlArray;
}
