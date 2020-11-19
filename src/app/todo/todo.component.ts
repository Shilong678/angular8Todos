import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RequestDataService } from "../request-data.service";
import { MatDialog } from "@angular/material";
import { EditTaskComponent } from "./edit-task/edit-task.component";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  dataSource: any;
  categories = ["house", "bureaucracy"];
  taskForm: FormGroup;
  filterType = "label";
  constructor(
    private _fb: FormBuilder,
    private _request: RequestDataService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createTaskForm();
    this.displayTask();
  }

  private createTaskForm() {
    this.taskForm = this._fb.group({
      label: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      done: [false]
    });
  }

  private displayTask() {
    this._request.receive("tasks").subscribe(
      res => {
        this.dataSource = res.body;
        this.changeDetectorRefs.detectChanges();
      },
      err => console.log(err)
    );
  }

  createTask() {
    this._request.send("tasks", this.taskForm.value).subscribe(
      res => {
        this.displayTask();
      },
      err => console.log(err)
    );
  }

  editTask(id) {
    this.dialog
      .open(EditTaskComponent, {
        width: "500px",
        data: id
      })
      .afterClosed()
      .subscribe(res => {
        this.displayTask();
      });
  }

  deleteTask(id) {
    this._request.delete("tasks", id).subscribe(
      res => {
        this.displayTask();
      },
      err => console.log(err)
    );
  }
}
