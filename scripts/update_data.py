import json
import os
from datetime import datetime, timedelta
import random

# Caminho para o arquivo de dados (ajustado para o ambiente do GitHub Actions)
DATA_FILE = 'client/src/data/dadosSimulados.ts'

def update_ts_file():
    if not os.path.exists(DATA_FILE):
        print(f"Arquivo {DATA_FILE} não encontrado.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Atualiza a data de atualização no resumo executivo
    now = datetime.now()
    now_str = now.strftime('%Y-%m-%dT%H:%M:%S')
    next_update = (now + timedelta(days=1)).strftime('%Y-%m-%dT06:00:00')
    
    # Simula pequenas variações diárias nos preços (apenas para demonstração da automação)
    # Em um cenário real, aqui haveria chamadas de API para CEPEA, IBGE, etc.
    
    # Atualiza a string de data no arquivo
    import re
    
    # Atualiza ultimaAtualizacao no resumoExecutivo
    content = re.sub(r"ultimaAtualizacao: '.*'", f"ultimaAtualizacao: '{now_str}'", content)
    content = re.sub(r"proximaAtualizacao: '.*'", f"proximaAtualizacao: '{next_update}'", content)
    
    # Atualiza a data no cabeçalho dos produtos
    today_date = now.strftime('%Y-%m-%d')
    content = re.sub(r"ultimaAtualizacao: '\d{4}-\d{2}-\d{2}'", f"ultimaAtualizacao: '{today_date}'", content)

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Dados atualizados com sucesso em {now_str}")

if __name__ == "__main__":
    # Cria o diretório de scripts se não existir
    os.makedirs('scripts', exist_ok=True)
    update_ts_file()
