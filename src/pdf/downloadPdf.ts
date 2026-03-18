

const downloadPDF = (base64String:any,fileName="Document.pdf")  => {

    const downloadLink = document.createElement("a");
   
    const base64StringURL = "data:application/pdf;base64,"+base64String;
    downloadLink.href = base64StringURL;
    
    downloadLink.download = fileName
    
    downloadLink.click();
    downloadLink.remove();

   // console.log("ORDER PDF",base64StringURL)
}

export default downloadPDF;