//
//  LastImageVC.swift
//  HackNJIT iOS
//
//  Created by Arya Tschand on 11/9/19.
//  Copyright © 2019 Arya Tschand. All rights reserved.
//

import UIKit
import MessageUI
import Photos

class LastImageVC: UIViewController, MFMessageComposeViewControllerDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate  {
    
    
    @IBOutlet weak var imgView: UIImageView!
    
    var images:[UIImage] = []

    func fetchPhotos () {
        images = []
        // Sort the images by descending creation date and fetch the first 3
        let fetchOptions = PHFetchOptions()
        fetchOptions.sortDescriptors = [NSSortDescriptor(key:"creationDate", ascending: false)]
        fetchOptions.fetchLimit = 1

        // Fetch the image assets
        let fetchResult: PHFetchResult = PHAsset.fetchAssets(with: PHAssetMediaType.image, options: fetchOptions)

        // If the fetch result isn't empty,
        // proceed with the image request
        if fetchResult.count > 0 {
            let totalImageCountNeeded = 1 // <-- The number of images to fetch
            fetchPhotoAtIndex(0, totalImageCountNeeded, fetchResult)
        }
    }

    // Repeatedly call the following method while incrementing
    // the index until all the photos are fetched
    func fetchPhotoAtIndex(_ index:Int, _ totalImageCountNeeded: Int, _ fetchResult: PHFetchResult<PHAsset>) {

        // Note that if the request is not set to synchronous
        // the requestImageForAsset will return both the image
        // and thumbnail; by setting synchronous to true it
        // will return just the thumbnail
        let requestOptions = PHImageRequestOptions()
        requestOptions.isSynchronous = true

        // Perform the image request
        PHImageManager.default().requestImage(for: fetchResult.object(at: index) as PHAsset, targetSize: view.frame.size, contentMode: PHImageContentMode.aspectFill, options: requestOptions, resultHandler: { (image, _) in
            if let image = image {
                // Add the returned image to your array
                self.images += [image]
            }
            self.imgView.image = self.images[0]
            // If you haven't already reached the first
            // index of the fetch result and if you haven't
            // already stored all of the images you need,
            // perform the fetch request again with an
            // incremented index
            if index + 1 < fetchResult.count && self.images.count < totalImageCountNeeded {
                self.fetchPhotoAtIndex(index + 1, totalImageCountNeeded, fetchResult)
            } else {
                // Else you have completed creating your array
                print("Completed array: \(self.images)")
            }
        })
    }
    
    @IBAction func ReloadBtn(_ sender: Any) {
        fetchPhotos()
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
    
    override func viewWillAppear(_ animated: Bool) {
        fetchPhotos()
    }
     
     override func viewDidLoad() {
         super.viewDidLoad()
    }

}
