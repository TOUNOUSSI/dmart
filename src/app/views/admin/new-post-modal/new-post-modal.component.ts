import { Component, OnInit } from "@angular/core";
import { MatDialogConfig, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "dmart-new-post-modal",
  templateUrl: "./new-post-modal.component.html",
  styleUrls: ["./new-post-modal.component.scss"],
})
export class NewPostModalComponent implements OnInit {
  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewPostModalComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
