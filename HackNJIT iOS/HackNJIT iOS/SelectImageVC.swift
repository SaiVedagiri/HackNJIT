//
//  SelectImageVC.swift
//  HackNJIT iOS
//
//  Created by Arya Tschand on 11/9/19.
//  Copyright © 2019 Arya Tschand. All rights reserved.
//

import UIKit
import MessageUI
import Photos

class SelectImageVC: UIViewController, MFMessageComposeViewControllerDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    let imagePicker = UIImagePickerController()
    @IBOutlet weak var imgView: UIImageView!
    
    @IBAction func ReloadBtn(_ sender: Any) {
        selectNew()
    }
    
    func messageComposeViewController(_ controller: MFMessageComposeViewController, didFinishWith result: MessageComposeResult) {
         switch (result) {
         case .cancelled:
             print("Message was cancelled")
             dismiss(animated: true, completion: nil)
         case .failed:
             print("Message failed")
             dismiss(animated: true, completion: nil)
         case .sent:
             print("Message was sent")
             dismiss(animated: true, completion: nil)
         default:
             break
         }
     }
     
     override func viewDidLoad() {
         super.viewDidLoad()
         imagePicker.delegate = self
         
    }
    
    override func viewWillAppear(_ animated: Bool) {
        selectNew()
    }
    
    func selectNew() {
        imagePicker.allowsEditing = false
        imagePicker.sourceType = .photoLibrary
            
        present(imagePicker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        if let pickedImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
            imgView.contentMode = .scaleAspectFit
            imgView.image = pickedImage
        }
     
        dismiss(animated: true, completion: nil)
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }

}
