import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RequestDataService } from "src/app/request-data.service";
import * as moment from "moment";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"]
})
export class EditTaskComponent implements OnInit {
  editForm: FormGroup;
  task: any;
  categories = ["house", "bureaucracy"];
  taskId: any;
  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<EditTaskComponent>,
    private _request: RequestDataService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.createForm();
    this.showTask();
  }

  showTask() {
    this.taskId = this.data;
    this._request.receive(`tasks/${this.taskId}`).subscribe(
      res => {
        this.task = res.body;
        // add default value to form
        this.editForm.patchValue({
          label: this.task.label,
          description: this.task.description,
          category: this.task.category
        });
      },
      err => console.log(err)
    );
  }

  createForm() {
    this.editForm = this._fb.group({
      label: [""],
      description: [""],
      category: [""],
      done: []
    });
  }

  editTask() {
    let status: any;
    if (this.editForm.value["done"] == null) {
      status = this.task.done;
    } else {
      status = this.editForm.value["done"];
    }
    this.editForm.patchValue({ done: status });

    this._request.update(`tasks/${this.taskId}`, this.editForm.value).subscribe(
      res => {
        this._dialogRef.close();
      },
      err => console.log(err)
    );
  }

  getDate() {
    return moment().format("DD-MM-YYYY");
  }
}
