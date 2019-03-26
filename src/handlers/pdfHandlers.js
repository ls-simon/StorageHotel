export function packListPDF(data) {

    if(data) {
        console.log("Data",data);
        
        const pdfConverter = require('jspdf')
        const doc = new pdfConverter()
        const {date, orderId, ownerName} = data

        let pdfXPlace = 20;
        let pdfYPlace = 50;
        
        doc.setFontSize(22);
        doc.text(pdfXPlace,pdfYPlace,"Packlist:");
        pdfYPlace +=5;
        doc.line(pdfXPlace,pdfYPlace,175,pdfYPlace);
        doc.setFontSize(15);
        pdfYPlace +=8;
        doc.text(pdfXPlace,pdfYPlace, "Ordre nr.: "+ orderId )
        pdfYPlace +=8;
        doc.text(pdfXPlace,pdfYPlace, "Customer: "+ ownerName )
        pdfYPlace +=8;
        doc.text(pdfXPlace,pdfYPlace,"Order date: "+ date)
        doc.setFontSize(10);
        pdfYPlace +=10

        doc.setFontStyle("bold")
        doc.text(pdfXPlace,pdfYPlace,"Produkt ID")
        doc.text(pdfXPlace+50,pdfYPlace,"Produkt Navn")
        doc.text(pdfXPlace+100,pdfYPlace,"Antal bestilt")
        doc.text(pdfXPlace+140,pdfYPlace,"Pakket?")
        pdfYPlace +=2
        doc.line(pdfXPlace,pdfYPlace,175,pdfYPlace);
        pdfYPlace +=8

        let counter = 0;
        const elements = data.orderLines
        for (const key in elements){
            doc.text(elements[key].product.productId,pdfXPlace,pdfYPlace)
            doc.text(elements[key].product.productName.toString(),pdfXPlace + 50,pdfYPlace);
            doc.text(elements[key].amount.toString(),pdfXPlace+100,pdfYPlace);
            doc.text("[ ]",pdfXPlace+140,pdfYPlace)
            doc.line(20,pdfYPlace+5,175,pdfYPlace+5);
            pdfYPlace += 15;
            counter += 1;
            if(counter%25===0){
                doc.addPage()
            }
        }

        doc.save("Pakkeliste.pdf")
    }
}

export function  orderNotePDF(data) {
    
    const pdfConverter = require('jspdf');
    const doc = new pdfConverter();
    const date = data.date.substring(0,16);

    let pdfXPlace = 20;
    let pdfYPlace = 50;
    
    doc.line(pdfXPlace,pdfYPlace,175,pdfYPlace);

    pdfYPlace += 7
    doc.setFontSize(12)
    doc.text(pdfXPlace,pdfYPlace,"Leveres til:")
    doc.setFontSize(16)
    doc.text(pdfXPlace+90, pdfYPlace,"Følgeseddel: ")
    
    pdfYPlace += 5
    doc.setFontSize(12)
    doc.text(pdfXPlace,pdfYPlace,data.owner)
    doc.text(pdfXPlace+90, pdfYPlace,"Ordernr.: "+ data.orderId)

    pdfYPlace += 5
    doc.text(pdfXPlace,pdfYPlace,data.address.contactPerson)
    doc.text(pdfXPlace+90, pdfYPlace,"Dato.: "+ date)

    pdfYPlace += 5
    doc.text(pdfXPlace,pdfYPlace,data.address.address)
    doc.text(pdfXPlace+90, pdfYPlace,"Kundenr.: "+ data.ownerHexId)

    pdfYPlace += 5
    doc.text(pdfXPlace,pdfYPlace,data.address.city +" "+ data.address.zipCode)
    doc.text(pdfXPlace+90, pdfYPlace,"Sag: "+ data.orderId)

    pdfYPlace += 5
    doc.text(pdfXPlace,pdfYPlace,data.address.country)
    doc.text(pdfXPlace+90, pdfYPlace,"Reference: "+ data.address.contactPerson)

    pdfYPlace += 10

    doc.text(pdfXPlace,pdfYPlace,"Hermed følger:")
    pdfYPlace +=5

    doc.text(pdfXPlace,pdfYPlace,"Ordre: " + data.ordreId)
    doc.setFontSize(18)
    doc.text(pdfXPlace+90,pdfYPlace,"SLUTLEVERING")
    doc.setFontSize(12)
    pdfYPlace +=5

    doc.text(pdfXPlace,pdfYPlace,"Rekv.nr.: " + data.hexId)
    pdfYPlace +=7

    doc.setFontStyle("bold")
    doc.text(pdfXPlace,pdfYPlace,"Item ID")
    doc.text(pdfXPlace+50,pdfYPlace,"Item Name")
    doc.text(pdfXPlace+140,pdfYPlace,"Amount")
    pdfYPlace +=2

    doc.line(pdfXPlace,pdfYPlace,175,pdfYPlace);
    pdfYPlace +=8
    doc.setFontStyle("normal")

    let counter = 0;
    const elements = data.orderLines
    for (const key in elements){
        doc.text(elements[key].productId.toString(),pdfXPlace,pdfYPlace)
        doc.text(elements[key].productName.toString(),pdfXPlace+50,pdfYPlace);
        doc.text(elements[key].quantity.toString(),pdfXPlace+140,pdfYPlace);
        doc.line(20,pdfYPlace+5,175,pdfYPlace+5);
        pdfYPlace += 10;
        counter += 1;
        if(counter%25===0){
            doc.addPage()
        }
    }

    doc.save("Følgeseddel.pdf")
}

export function entireStockPDF(state) { 

    const pdfConverter = require('jspdf');
    const doc = new pdfConverter();
    const elements= {...state.products}
    
    doc.setFontSize(22);
    doc.text(20,50,"Entire stock:");
    doc.setFontSize(10);
    let pdfXPlace = 25;
    let pdfYPlace = 65;
    let counter = 0;
    for (const key in elements){
        
        doc.text("Name: "+elements[key].productName,pdfXPlace,pdfYPlace);
        doc.text("Quantity: " + elements[key].quantity,pdfXPlace+120,pdfYPlace);
        doc.line(20,pdfYPlace+5,175,pdfYPlace+5);
        pdfYPlace += 17;
        counter += 1;
        if(counter%25===0){
            doc.addPage()
        }
    }

    doc.save("EntireStock.pdf")
}