// Substitua "Tabela" pelo nome correto da sua tabela, se necessário.

const baseURL = 'https://api.airtable.com/v0/appslrcw1xVDKvAGi/tblCRqEQsPvAVY9y1';
const apiKey = 'patDpkUS0xUIXWXzO.ea4978724f0838d3f530410731810a187c793d44a34bc27053ed9cb78e4e1763'; // Insira sua API key do Airtable aqui

// Função para buscar registros do Airtable e atualizar a lista
async function fetchRecords() {
  try {
    const response = await fetch(`${baseURL}?view=Grid%20view`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    const registrosList = document.getElementById('registrosList');
    registrosList.innerHTML = '';

    if (data.records && data.records.length > 0) {
      data.records.forEach(record => {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        // Formata a data e extrai o conteúdo do registro
        const date = record.fields.data_hora ? new Date(record.fields.data_hora).toLocaleString() : '';
        const registro = record.fields.registro || '';

        li.innerHTML = `<strong>${date}</strong>: ${registro}`;
        registrosList.appendChild(li);
      });
    } else {
      registrosList.innerHTML = '<li class="list-group-item">Nenhum registro encontrado.</li>';
    }
  } catch (error) {
    console.error('Erro ao buscar registros:', error);
  }
}

// "patDpkUS0xUIXWXzO.ea4978724f0838d3f530410731810a187c793d44a34bc27053ed9cb78e4e1763"
async function addRecord() {
  const registroInput = document.getElementById('registroInput');
  const registroValue = registroInput.value.trim();

  if (registroValue === '') {
    alert('Por favor, digite um registro.');
    return;
  }
  
  const currentDate = new Date().toISOString();
  
  const data = {
    fields: {
      registro: registroValue,
      data_hora: currentDate
    }
  };
  
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      registroInput.value = '';
      fetchRecords(); // Atualiza a lista de registros após a inclusão
    } else {
      console.error('Erro ao cadastrar registro:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao cadastrar registro:', error);
  }
}

// Configura os eventos ao carregar a página
document.getElementById('btnCadastrar').addEventListener('click', addRecord);
document.addEventListener('DOMContentLoaded', fetchRecords);
