window.addEventListener("load", initialize);

		function initialize() {
			document.getElementById("button1").addEventListener("click",popUp);


		}

		function popUp(){
			alert(document.getElementById("content").value);

		}

	