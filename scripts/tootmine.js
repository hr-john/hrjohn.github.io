function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};
	 
 function addRow(Row_value) {
  var tableRef = document.querySelector("#extension_table");
   tableRef.innerHTML = tableRef.innerHTML + Row_value;
 }
  
 function display(msg) {
   var rida={ hind:[0] }, rows = csvToArray(msg);
   var rowNum, row, KP="",r_date,priceRow, algus=1, tootmine=2, toodetud=0, tarbitud=0,  tarbimine=3;
   var cells=[], arve_summa=0, kogu_kw=0, arve_usumma=0, kogu_ukw=0, paeva_kw=[], tarbitud_kw=[] ;  //        var cellNum;
//   cells = rows[0][0].split(";") ;
   console.log ( "ALGUS " + algus + rows[0] + " " + tootmine ) ;
    addRow("<TH>KUUP&Auml;EV</TH><TH>00-01</TH><TD>01-02</TD><TD>02-03</TD><TD>03-04</TD><TD>04-05</TD><TD>05-06</TD><TH>06-07</TH><TD>07-08</TD><TD>08-09</TD><TD>09-10</TD><TD>10-11</TD><TD>11-12</TD>" +
           "<TD>12-13</TD><TD>13-14</TD><TD>14-15</TD><TD>15-16</TD><TD>16-17</TD><TD>17-18</TD><TD>18-19</TD><TD>19-20</TD><TD>20-21</TD><TD>21-22</TD><TD>22-23</TD><TD>23-00</TD><TH>KOKKU</TH>");

      for (rowNum = algus; rowNum < rows.length ; ++rowNum) {
 //      row = rows[rowNum].join() ;
       cells = rows[rowNum].join().split(";") ; 
       r_date = cells[1].replace(/(\d{2})\.(\d{2})\.(\d{4}) [A-Za-z0-9.,-:]*/,'$3-$2-$1') ; //split(" ") ;
	 if ( !KP )
         {
          KP=r_date ;
          var yesterday = new Date(Date.parse(KP)-1000*3600*24).toJSON().slice(0,10),reads;
         }
        if ( KP != r_date )
         {
    //                alert ( KP + " KP " + Date.parse(KP) ) ;  
          GetPrice(yesterday , KP,paeva_kw, tarbitud_kw);
          yesterday = new Date(Date.parse(KP)).toJSON().slice(0,10),reads;
          KP=r_date ;
          //          console.log ( Math.round(rowNum/24) + " " + rowNum + " "+ paeva_kw ) ;
          paeva_kw=[] ;
	  tarbitud_kw=[];
         } //  if KP
         if (cells.length<=tootmine) { tootmine=2 };
	      console.log ( tootmine + cells + " " + cells.length + " " + cells[1] + "X" + cells[tarbimine] + "Y" + cells[tootmine] ) ;
	       toodetud= cells[tootmine].replace(",",".") ;
         tarbitud= cells[tarbimine].replace(",",".") ;
         paeva_kw.push( toodetud );
         tarbitud_kw.push( tarbitud) ;
      } // for rowNum
   KP=new Date(Date.parse(r_date)).toJSON().slice(0,10) ;
   GetPrice(yesterday , KP ,paeva_kw, tarbitud_kw ) ;
   console.log ( Math.round(rowNum/24) + " " + rowNum + " "+ paeva_kw ) ;

     function GetPrice(start_time,end_time, kws, ukws) {
	console.log("KWs"+kws + " " + ukws) ;
        function transferComplete(evt) {
         answer(xhr.status == 200 ? xhr.responseText : null) ;
         }
      var xhr = new XMLHttpRequest();
      var i, hind; 
       xhr.onreadystatechange = handleStateChange;
      var a1=new Date(end_time) ; 
       if ( a1.getTimezoneOffset() == -180 ) 
	   { xhr.open("GET", "https://dashboard.elering.ee/api/nps/price/csv?start="+ start_time+"T21:00:00.000Z&end="+end_time+"T20:59:59.999Z&fields=ee"); // - suveajal
	   }
	 else
	   { xhr.open("GET", "https://dashboard.elering.ee/api/nps/price/csv?start="+ start_time+"T22:00:00.000Z&end="+end_time+"T21:59:59.999Z&fields=ee"); // talveajal
	   }
        xhr.send();  
	  
       function handleStateChange() {
        var rows, cells ;
        var p_end = document.createElement('p');
          if ( xhr.readyState == 4 )
           { 
             var vahe_summa=0, vahe_kw =0, vahe_usumma=0, vahe_ukw=0;
	     var p_row1 = "<TR><TD>" + end_time + "</TD>", p_row2 ="<TR><TD>tootmine MWh</TD>", p_row3 = "<TR><TD>€</TD>", p_row4 ="<TR><TD>tarbimine MWh</TD>", p_row5 = "<TR><TD>€</TD>" ;  
             rows = [] ;
             rows = csvToArray(xhr.responseText);
//             console.log( "Kilowats " + start_time + " " + end_time + " " + kws ) ;
//             console.log( "PRICE" + rows.length + " " + rows[1] ) ;
             p_end.innerHTML="<BR>";
              for (i = 1; i < rows.length-1 && i <= kws.length; i++) {
                cells = rows[i][0].split(";") ;
                hind=cells[2].replace(",",".");
                vahe_summa += Math.round(kws[i-1]*hind*10)/10 ;
                vahe_kw += Math.round(kws[i-1]*10)/10 ;
                vahe_usumma += Math.round(ukws[i-1]*hind*10)/10 ;
                vahe_ukw += Math.round(ukws[i-1]*10)/10 ;
                p_end.innerHTML += rows[i][0] + " XXX " + hind + " XXX " + kws[i-1] + " X "+ kws[i-1]*hind + "<BR>" ;
                p_row1 += "<TD>" + hind + "</TD>" ;
                p_row2 += "<TD>" + kws[i-1] + "</TD>" ;
                p_row3 += "<TD>" +Math.round( kws[i-1]*hind ) + "</TD>" ;
                p_row4 += "<TD>" + kws[i-1] + "</TD>" ;
                p_row5 += "<TD>" +Math.round( kws[i-1]*hind ) + "</TD>" ;
               }
            p_row1 = p_row1 + "<TD></TD></TR>" ;
            p_row2 = p_row2 + "<TD>" + Math.round(vahe_kw*10/1000)/10 + " GWh </TD></TR>" ;
	    p_row3 = p_row3 + "<TD>" + Math.round(vahe_summa) + "</TD></TR>" ;			
	    addRow(p_row1);
	    addRow(p_row2);
	    addRow(p_row3);
            p_end.innerHTML += "MWh " + vahe_kw + " SUMMA " + vahe_summa + "<BR>" ;
            document.body.appendChild(p_end);
            arve_summa += vahe_summa ;
            kogu_kw += vahe_kw ;
            arve_usumma += vahe_usumma ;
            kogu_ukw += vahe_ukw ;
            document.getElementById("summa_1").innerHTML= Math.round(arve_summa/100000)/10 + " M€" ;
            document.getElementById("kwh_1").innerHTML =   Math.round(kogu_kw/10)/100 + " GWh" ;
            document.getElementById("summa_2").innerHTML= Math.round(arve_usumma/100000)/10 + " M€" ;
            document.getElementById("kwh_2").innerHTML =   Math.round(kogu_ukw/10)/100 + " GWh" ;
           }

        } ; // handleStateChange
    } // GetPrice
   } // display
  
function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
   display(reader.result);
   };
  reader.onerror = function() {
   console.log(reader.error);
  };
}
   
  
     function kuva() {
      var yesterday = new Date(kp).toJSON().slice(0,10), reads;
      var utc = new Date(kp+1000*3600*24).toJSON().slice(0,10);
      GetPrice(yesterday,utc,null,function(reads) {
         alert ( "READS " + reads ) ;       
      }
       ) ;
       var rida = showData(reads);
       var data = {
             labels:  rida.aeg ,
             series:  [ 
               {
                name:'HIND',
                data:rida.hind
               }
              ]
           };
       new Chartist.Line('.ct-chart', data, {
         high: Math.ceil(Math.max.apply(Math,rida.hind)/10)*10 ,
         low: 0,
         showPoint: false,
         axisY: {
           Offset: 20,
           onlyInteger: true
          },
         series: {  'HIND': { lineSmooth: Chartist.Interpolation.step() } } // Näitab hind ühtlaselt tunni jooksul
        } ); // Chartist.Line    
    } // kuva 


   function showData(data) {
       var utc=[],aeg=[],hind=[];
       var rows = csvToArray(data);
       var rowNum;
       var cells;   //        var cellNum;
        for (rowNum = 1; rowNum < rows.length-1 ; ++rowNum) {
         cells = rows[rowNum][0].split(";") ;
         utc.push(cells[0]);aeg.push(cells[1].substr(-5,5));hind.push(cells[2].replace(",","."));
        } // for rowNum
      return {
              utc:utc,
              aeg:aeg,
              hind:hind};
      } // showData