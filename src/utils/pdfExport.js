import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportManifestoToPDF = async () => {
  const element = document.getElementById('manifesto-print-area');
  if (!element) {
    window.print();
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('The-Next-India-Citizen-Manifesto-RRMI.pdf');
  } catch (err) {
    console.error('PDF export failed, falling back to print dialog', err);
    window.print();
  }
};

export const downloadBadgeAsImage = async (badgeElementId, fileName = 'RRMI-Voice-Badge.png') => {
  const element = document.getElementById(badgeElementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Badge download failed', err);
  }
};
