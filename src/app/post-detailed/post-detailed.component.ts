import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule,Router, ActivatedRoute} from '@angular/router';
import { BlogFService } from '../services/blog-f.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { DeleteLoadDialogComponent } from '../delete-load-dialog/delete-load-dialog.component';
import { CommentsDisplayComponent } from '../comments-display/comments-display.component';
import { CommentsFormComponent } from '../comments-form/comments-form.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-post-detailed',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatButton, DeleteLoadDialogComponent, CommentsDisplayComponent, CommentsFormComponent],
  templateUrl: './post-detailed.component.html',
  styleUrl: './post-detailed.component.css'
})
export class PostDetailedComponent implements OnInit{
  @ViewChild(CommentsDisplayComponent) commentsDisplay!: CommentsDisplayComponent;
  blog: any; // single blog
  currentUserId: number | null = null; // current user id

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private blogFService: BlogFService,
    private cookieService: CookieService,
    private dialog: MatDialog,
  ) {};

  ngOnInit(): void {
    this.currentUserId = this.blogFService.getCurrentUserId();
    this.fetchBlogById();
    const blog_id = this.activatedRoute.snapshot.params['id'];
    const cookieExpire = 1 / 24; // 1 hour

    // if(!this.cookieService.check(`viewed_blog_${blog_id}`)){
    //   this.cookieService.set(`viewed_blog_${blog_id}`, 'true', cookieExpire, '/', '', true, 'None');
    // }
  }

  onCommentAdded(): void {
    this.commentsDisplay.fetchComments();
  }

  fetchBlogById(): void {
    const blog_id = this.activatedRoute.snapshot.params['id'];
    console.log('Blog ID: ', blog_id);
    this.blogFService.displayBlogById(blog_id).subscribe(
      (response) => {
        console.log('Blog: ', response);
        this.blog = response.blog;
      },
      (error) => {
        console.log('Error fetching blog: ', error);
      }
    );
  }

  goBack(): void { 
    this.router.navigate(['/blogs']);
  }
  
  editBlog(blog_id: number): void{
    this.router.navigate(['/edit-blog', blog_id]);
  }

  deleteBlog(blog_id: number): void {
    this.blogFService.deleteBlog(blog_id).subscribe(
      (response) => {
        console.log('Blog deleted: ', response);
        // this.fetchBlogs();
      },
      (error) => {
        console.log('Error deleting blog: ', error);
      }
    );
    
    const dialogRef = this.dialog.open(DeleteLoadDialogComponent, {
      disableClose: true,
    });

    setTimeout(() => {
      dialogRef.close();
      this.router.navigate(['/blogs']);
    }, 2000);
    
  }
}
