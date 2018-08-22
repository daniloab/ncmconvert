import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NcmConvert';

  public fileToUpload: File = null;

  private fileText: any;
  private fileString: any;
  private ncmText: any;
  private ncmFinal: any;
  private textFileNcm: any;
  private date: any;

  ngOnInit() {

  }

  fileUpload(event) {
    var vm = this;
    vm.ncmFinal = "";
    vm.fileText = "";

    var reader = new FileReader();

    reader.readAsText(event.srcElement.files[0]);

    reader.onload = function () {
      vm.fileText = reader.result;

      if (vm.fileText != null) {
        vm.ncmText = vm.fileText.split(",");

        vm.ncmText.forEach((item, index) => {
          if(item){
            var ncm = item.replace(/[^0-9]/g, '');
            var sql = `insert into NCM_FORA_CATALOGO values ('${ncm}');\r\n`;
            vm.ncmFinal += sql;
          }
        });

        vm.date = new Date().toLocaleDateString();

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(vm.ncmFinal));
        element.setAttribute('download', `Arquivo Ncm ${vm.date}`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

      } else
        alert('Lista de ncm vazia ou no formato incorreto');
    }
  }
}
