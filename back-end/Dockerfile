FROM python:3.9-slim-buster

COPY --from=python:3.9-slim-buster / /

ENV PIP_DISABLE_PIP_VERSION_CHECK=on \
    POETRY_VIRTUALENVS_CREATE=false

# System deps:
RUN pip install -U pip \
    && apt-get update \
    && apt install -y curl netcat \
    && curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
ENV PATH="${PATH}:/root/.poetry/bin"

# Copy only requirements to cache them in docker layer
WORKDIR /api
COPY poetry.lock pyproject.toml /api/

# Project initialization:
RUN poetry install --no-interaction --no-ansi

# Creating folders, and files for a project:
COPY . /api

CMD ["poetry","run","uvicorn","app:app", \
    "--host","0.0.0.0", \
    "--port","8080"]
