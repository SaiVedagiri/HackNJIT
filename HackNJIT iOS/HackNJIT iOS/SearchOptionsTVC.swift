//
//  SearchOptionsTVC.swift
//  HackNJIT iOS
//
//  Created by Arya Tschand on 11/9/19.
//  Copyright © 2019 Arya Tschand. All rights reserved.
//

import UIKit

class SearchOptionsTVC: UITableViewController {
    
    var labelArray: [String] = ["Current News", "Info on Topic", "Weather", "Answer Question", "Directions", "Restaurant Recommendations", "Translation", "Google Search"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
           return 8
       }
       
       // Set team information as labels for each row
       override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
           let cell = tableView.dequeueReusableCell(withIdentifier: "options", for: indexPath)
            cell.textLabel?.text = labelArray[indexPath.row]
            return cell
       }
       
       override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
           return true
       }
       
       // Enable the swipe to delete team
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        }

}
