from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    link: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to my personal website API"}

@app.get("/api/projects")
async def get_projects():
    # Sample projects data - you can replace this with your own projects
    projects = [
        Project(
            title="Personal Website",
            description="A modern personal website built with FastAPI and React",
            technologies=["Python", "TypeScript", "React", "FastAPI"],
            link="https://github.com/yourusername/personal-website"
        ),
        # Add more projects here
    ]
    return projects

@app.get("/api/about")
async def get_about():
    return {
        "name": "Your Name",
        "title": "Software Developer",
        "bio": "A passionate developer with experience in web development and software engineering.",
        "skills": ["Python", "TypeScript", "React", "FastAPI", "SQL"],
        "contact": {
            "email": "your.email@example.com",
            "github": "https://github.com/yourusername",
            "linkedin": "https://linkedin.com/in/yourusername"
        }
    } 