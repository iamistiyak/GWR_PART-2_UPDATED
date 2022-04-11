from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException,status
from hashing import Hash

# Create new admin
def create(request: schemas.Admin,db:Session):
    new_user = models.Admin(name=request.name,email=request.email,password=Hash.encrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Show particular admin
def show(id:int,db:Session):
    user = db.query(models.Admin).filter(models.Admin.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Admin with the id {id} is not available")
    return user

# Show all admins   
def showAll(db:Session):
    user = db.query(models.Admin).all()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Admin with the id {id} is not available")
    return user

# Delete admin  
def deleteAdmin(id:int,db:Session):
    user = db.query(models.Admin).filter(models.Admin.id == id)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Admin with the id {id} is not available")

    user.delete(synchronize_session=False)
    db.commit()
    return {"Deleted successfully"}  