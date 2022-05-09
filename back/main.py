import json
from os import access
from flask import Flask, render_template, request, redirect, url_for, session,abort

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import docx
from docx import Document
from docx.shared import Inches
import csv
import os
import requests
import pandas as pd
from webdriver_manager.chrome import ChromeDriverManager
from flask_cors import CORS

chrome_options = Options()
chrome_options.add_argument("--headless")

def get_page(keyword):
    driver=webdriver.Chrome(ChromeDriverManager().install(),options=chrome_options)
    URL=driver.get('https://pubchem.ncbi.nlm.nih.gov/')
    search_key_word=keyword
    search=driver.find_element_by_xpath("//div[@class='flex-grow-1 p-xsm-left p-xsm-top p-xsm-bottom b-right b-light']/input").send_keys(search_key_word)
    find=driver.find_element_by_xpath("//button[@data-action='search-button']")
    find.click()
    result_loaded = EC.presence_of_element_located((By.XPATH,'//div[@id="featured-results"]//div[@class="f-medium p-sm-top p-sm-bottom f-1125"]/a'))
    WebDriverWait(driver, 3).until(result_loaded)
    best_match= driver.find_element_by_xpath("//div[@id='featured-results']//div[@class='f-medium p-sm-top p-sm-bottom f-1125']/a").click()
    
    try:
        ATC_codes_loaded = EC.presence_of_element_located((By.XPATH,"//*[@id='ATC-Code']"))
        WebDriverWait(driver,3).until(ATC_codes_loaded)
        ATC_codes=driver.find_element_by_xpath("//*[@id='ATC-Code']")
        list_atc_codes=[]
        for i in ATC_codes.find_elements_by_xpath("//a[@data-label='Content Link: ATC-Code']"):
            if(i.get_property("target")!="_self" and i.get_property("rel")!="follow"):
                list_atc_codes.append(i.find_element_by_xpath('..').text)
                list_atc_codes.append("")
        list_atc_codes
    except:
        list_atc_codes=" "
    
    try:
        IUPAC_name=driver.find_element_by_xpath("//section[@id='IUPAC-Name']//p")
        iupac=IUPAC_name.text
    except NoSuchElementException:
        iupac=" "
    
    try:
        physical_description=driver.find_element_by_xpath("//section[@id='Physical-Description']//p")
        phy_desc=physical_description.text
    except NoSuchElementException:
        phy_desc=" "
    
    try:
        phy_desc_reviews_find=driver.find_element_by_xpath("//section[@id='Physical-Description']//div[@class='peer-review f-0875 f-lh-115 italic f-gray regular-links breakword'][1]/*")
        phy_desc_review=phy_desc_reviews_find.text
    except NoSuchElementException:
        phy_desc_review=" "

    try:
        solubility_find_1=driver.find_element_by_xpath("//section[@id='Solubility']//*[contains(text(), 'CAMEO Chemicals')]/../../../preceding::p[1]")
        solubility_1=solubility_find_1.text
        solubility_1
    except NoSuchElementException:
        solubility_find_1=driver.find_element_by_xpath("//section[@id='Solubility']//div[@class='section-content-item'][1]/p")
        solubility_1=solubility_find_1.text
    except NoSuchElementException:
        solubility_1=" "

    try:
        solubility_find_1_review=driver.find_element_by_xpath("//section[@id='Solubility']//*[contains(text(), 'CAMEO Chemicals')]/../../../preceding::div[1]")
        solubility_1_review=solubility_find_1_review.text
        solubility_1_review
    except NoSuchElementException:
        solubility_1_review=" "

    try:
        melting_point_find=driver.find_element_by_xpath("//*[@id='Melting-Point']//div[2]//div/p")
        melting_point=melting_point_find.text
    except NoSuchElementException:
        melting_point=" "

    try:
        optical_rotation_find= driver.find_element_by_xpath("//section[@id='Optical-Rotation']/div[2]/div[1]/p")
        optical_rotation=optical_rotation_find.text
    except NoSuchElementException:
        optical_rotation=" "

    try:
        optical_rotation_find_review= driver.find_element_by_xpath("//section[@id='Optical-Rotation']/div[2]/div[1]/div")
        optical_rotation_review= optical_rotation_find_review.text
    except NoSuchElementException:
        optical_rotation_review=" "

    try:
        decomposition_find= driver.find_element_by_xpath("//section[@id='Decomposition']/div[2]/div/p")
        decomposition=decomposition_find.text
    except NoSuchElementException:
        decomposition=" "
    
    try:
        decomposition_review_find=driver.find_element_by_xpath("//section[@id='Decomposition']/div[2]/div/div")
        decomposition_review=decomposition_review_find.text
    except NoSuchElementException :
        decomposition_review=" "

    try:
        shelf_life_find=driver.find_element_by_xpath("//section[@id='Stability-Shelf-Life']/div[2]/div/p")
        shelf_life=shelf_life_find.text
    except NoSuchElementException:
        shelf_life=" "

    try:
        shelf_life_find_review=driver.find_element_by_xpath("//section[@id='Stability-Shelf-Life']/div[2]/div//div[@class='peer-review f-0875 f-lh-115 italic f-gray regular-links breakword']/*")
        shelf_life_review=shelf_life_find_review.text
    except NoSuchElementException:
        shelf_life_review=" "

    try:
        stability_find=driver.find_element_by_xpath("//section[@id='Stability-Shelf-Life']/div[2]/div[3]/p")
        stability=stability_find.text
    except NoSuchElementException:
        stability=" "

    try:
        molecular_formula_find=driver.find_element_by_xpath("//section[@id='Molecular-Formula']/div[2]/div/p")
        molecular_formula=molecular_formula_find.text
    except NoSuchElementException:
        molecular_formula=" "

    try:
        CAS_number_find=driver.find_element_by_xpath("//section[@id='CAS']/div[2]/div[1]/p")
        CAS_number=CAS_number_find.text
    except NoSuchElementException:
        CAS_number=" "

    try:
        molecular_weight_find=driver.find_element_by_xpath("//section[@id='Computed-Properties']/div[2]/div/div[1]/table/tbody/tr[1]/td[2]")
        molecular_weight=molecular_weight_find.text
    except NoSuchElementException:
        molecular_weight=" "

    return {"ATC-Code":list_atc_codes,
            "iupac":iupac,"phy_desc":phy_desc,
            "phy_desc_review":phy_desc_review,
            "solubility_1":solubility_1,
            "solubility_1_review":solubility_1_review,
            "melting_point":melting_point,
            "optical_rotation":optical_rotation,
            "optical_rotation_review":optical_rotation_review,
            "decomposition":decomposition,
            "decomposition_review":decomposition_review,
            "shelf_life":shelf_life,
            "shelf_life_review":shelf_life_review,
            "stability":stability,
            "molecular_formula":molecular_formula,
            "CAS_number":CAS_number,
            "molecular_weight":molecular_weight,
            }




# Intialize Flask
app = Flask(__name__)
# Change this to your secret key (can be anything, it's for extra protection)
app.secret_key = '%3&}QWkq+>y7<pqZ'

CORS(app)

@app.route('/get_keys',methods=['GET'])
def get_features():
    molucule = request.args.get('molucule')
    return get_page(molucule)



if __name__ == "__main__":
    app.run(host="0.0.0.0")