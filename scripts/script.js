var cleaveNome, cleaveCargo, cleaveRamal, cleaveCelular, cleaveCelular2, cleaveEmail;

document.addEventListener('DOMContentLoaded', function() {
    // Código que usa o Cleave
    cleaveNome = new Cleave('#nome', {
            blocks: [100],
            delimiter: '',
            uppercase: true
    });

    cleaveCargo = new Cleave('#cargo', {
            blocks: [100],
            delimiter: '',
            uppercase: true
    });

    cleaveRamal = new Cleave('#ramal', {
		blocks: [4],
		numericOnly: true
    });
	
	cleaveCelular = new Cleave('#celular', {
		delimiters: ['(', ') ', '-'],
		blocks: [0, 2, 5, 4],
		numericOnly: true
    });
	
	cleaveCelular2 = new Cleave('#celular2', {
		delimiters: ['(', ') ', '-'],
		blocks: [0, 2, 5, 4],
		numericOnly: true
    });
	
	cleaveEmail = new Cleave('#email', {});
});


function configureFormEvent(formId, customConst, cleaveInstances) {
    const form = document.getElementById(formId);
	
	if (!form) {
        console.error(`Formulário com ID "${formId}" não encontrado.`);
        return;
    }
	
	
    form.addEventListener('submit', function(event) {
        event.preventDefault();
		
			function getFromCleaveInput(cleaveInstance) {
				return cleaveInstance.getRawValue();
			}
		
			function getFromCleaveInputFormated(cleaveInstance) {
				return cleaveInstance.getFormattedValue();
			}
		
			const nome = getFromCleaveInput(cleaveNome);
			const cargo = getFromCleaveInput(cleaveCargo);
			const ramal = getFromCleaveInput(cleaveRamal);
			const celular = getFromCleaveInputFormated(cleaveCelular);
			const celular2 = getFromCleaveInputFormated(cleaveCelular2);
			
			const email = getFromCleaveInputFormated(cleaveEmail);
		
			console.log(celular2);
	
			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext('2d');
		
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const imgBase64 = customConst; // Substitua pela string Base64 completa
			const img = new Image();
			img.src = imgBase64;
			img.onload = function() {
				// Obtém a largura e a altura originais da imagem
				const larguraImagem = img.width;
				const alturaImagem = img.height;

				// Limpa o canvas antes de desenhar a nova imagem
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				// Ajusta o tamanho do canvas para que seja do mesmo tamanho da imagem base64
				canvas.width = larguraImagem;
				canvas.height = alturaImagem;

				// Desenha a imagem com as dimensões originais
				ctx.drawImage(img, 0, 0, larguraImagem, alturaImagem);

				ctx.font = 'bold 42px Montserrat';
				ctx.fillStyle = '#f8f9fa';
				ctx.fillText(nome, 35, 75); 

				ctx.font = 'bold 22px Montserrat';
				ctx.fillStyle = '#00daf8';
				ctx.fillText(cargo, 35, 110); 
				
				ctx.font = 'bold 22px Montserrat';
				ctx.fillStyle = '#f8f9fa';
				ctx.fillText(email, 35, 165); 
				
				ctx.font = 'bold 22px Montserrat';
				ctx.fillStyle = '#f8f9fa';
				ctx.fillText('Tel:', 420, 220); 
				
				ctx.font = 'bold 22px Montserrat';
				ctx.fillStyle = '#f8f9fa';
				ctx.fillText('(44) 3663-8000', 470, 220); 
				
				
				if (ramal) {
					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText('Ramal:', 705, 220);

					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText(ramal, 790, 220);
				}
				
				if (celular2) {
					
					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText('Cel:', 45, 205);

					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText(celular, 100, 205);
					
					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText('Cel:', 45, 235);

					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText(celular2, 100, 235);
					
				} else {
									
					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText('Cel:', 45, 220); 

					ctx.font = 'bold 22px Montserrat';
					ctx.fillStyle = '#f8f9fa';
					ctx.fillText(celular, 100, 220); 
				}



				document.getElementById('downloadPDF').style.display = 'block';
				document.getElementById('downloadPNG').style.display = 'block';
				
				document.getElementById('downloadPDF')?.addEventListener('click', function() {
					const canvas = document.getElementById('canvas');
					const imgData = canvas.toDataURL('image/png');

					const { jsPDF } = window.jspdf;
					const pdf = new jsPDF('landscape');
				
					var imgWidth = 298;
					var imgHeight = canvas.height * imgWidth / canvas.width;
				
					pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
					pdf.save('download.pdf');
				});

				document.getElementById('downloadPNG')?.addEventListener('click', function() {
					const canvas = document.getElementById('canvas');
					const link = document.createElement('a');
					link.href = canvas.toDataURL('image/png');
					link.download = 'download.png';
					link.click();
				});
			};
    });
}

const fundoAssinatura = localStorage.getItem('fundoAssinatura');
							
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const formId = 'assinaturaForm';
    if (formId) {
        configureFormEvent(formId, fundoAssinatura);
    } else {
        console.error('Parâmetro "form" não encontrado na URL.');
    }
});


