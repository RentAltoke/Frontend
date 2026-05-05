import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.html',
  imports: [CommonModule, RouterModule],
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit{


constructor(
  private http: HttpClient,
) {}

ngOnInit(): void {

this.cargarRecibos();
}


recibos: any[] = [];
cargarRecibos(){
  this.http.get<any[]>(`http://localhost:8081/api/recibos/resumen`).subscribe(data => {

  this.recibos = data.map(r => ({

    codigo:r.codigo_recibo,
    tipo:r.tipo_unidad,
    unidad:r.unidad,
    inmueble:r.inmueble,
    inquilino:r.inquilino,
    ipc:r.ipc,
    agua:r.agua,
    igv:r.igv,
    luz:r.luz,
    renta:r.renta,
    mantenimiento:r.mantenimiento,
    otros:r.otros,
    total:r.total_recibo,
    
   
    cod_inquilino:r.codigo_inquilino,
    cod_inmueble:r.imagen_url,
    
    
      }));
  });
}


async generarPDF(r: any) {

  const doc = new jsPDF();

  // 📌 RUTAS
  const logoURL = '/logo2.png';
  const inquilinoURL = `/inquilinos/${r.cod_inquilino}.jpg`;
  const inmuebleURL = r.cod_inmueble;

  const logo = await this.getBase64ImageFromURL(logoURL);
  const imgInquilino = await this.getBase64ImageFromURL(inquilinoURL);
  const imgInmueble = await this.getBase64ImageFromURL(inmuebleURL);



  doc.setFillColor(15, 28, 52);
  doc.rect(0, 0, 210, 30, 'F');

  doc.addImage(logo, 'PNG', 14, 8, 30, 14);

  doc.setTextColor(255,255,255);
  doc.setFontSize(16);
  doc.text('REPORTE DE RECIBO', 105, 18, { align: 'center' });

  doc.setFillColor(240, 240, 240);
  doc.roundedRect(14, 35, 120, 45, 3, 3, 'F');

  doc.setTextColor(0,0,0);
  doc.setFontSize(10);

  doc.text(`Código:`, 18, 42);
  doc.text(`${r.codigo}`, 50, 42);

  doc.text(`Inquilino:`, 18, 48);
  doc.text(`${r.inquilino}`, 50, 48);

  doc.text(`Unidad:`, 18, 54);
  doc.text(`${r.unidad}`, 50, 54);

  doc.text(`Inmueble:`, 18, 60);
  doc.text(`${r.inmueble}`, 50, 60);


  doc.setDrawColor(254, 109, 3);


  doc.rect(140, 35, 50, 30);
  doc.addImage(imgInquilino, 'JPEG', 142, 37, 46, 26);

  doc.rect(140, 70, 50, 30);
  doc.addImage(imgInmueble, 'JPEG', 142, 72, 46, 26);


  const conceptos = [
    { nombre: 'Renta', valor: r.renta },
    { nombre: 'Agua', valor: r.agua },
    { nombre: 'Luz', valor: r.luz },
    { nombre: 'Mantenimiento', valor: r.mantenimiento },
    { nombre: 'IPC', valor: r.ipc },
    { nombre: 'IGV', valor: r.igv },
    { nombre: 'Otros', valor: r.otros }
  ].filter(c => c.valor && c.valor > 0);


  autoTable(doc, {
    startY: 90,
    head: [['Concepto', 'Importe']],
    body: conceptos.map(c => [c.nombre, `S/ ${c.valor.toFixed(2)}`]),
    styles: {
      fontSize: 10,
      cellPadding: 4
    },
    headStyles: {
      fillColor: [254, 109, 3],
      textColor: 255,
      halign: 'center'
    },
    columnStyles: {
      1: { halign: 'right' }
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY;

  // 🟧 TOTAL BOX
  doc.setFillColor(254, 109, 3);
  doc.rect(130, finalY + 5, 60, 12, 'F');

  doc.setTextColor(255,255,255);
  doc.setFontSize(12);
  doc.text(`TOTAL: S/ ${r.total.toFixed(2)}`, 160, finalY + 13, { align: 'center' });

  // 📌 FOOTER LINE
  doc.setDrawColor(15, 28, 52);
  doc.line(14, 280, 196, 280);

  // FOOTER TEXT
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('Sistema RentAltoke', 14, 285);
  doc.text('Generado automáticamente', 150, 285);

  // 💾 GUARDAR
  doc.save(`Recibo_${r.codigo}.pdf`);
}


getBase64ImageFromURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };

    img.onerror = error => reject(error);
    img.src = url;
  });
}


}   




